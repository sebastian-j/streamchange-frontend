/**
 * FortuneWheelRaffle
 *
 * Full-screen giveaway animation: a fortune wheel of nicknames spins and
 * slows down until the winner stops under the needle at the top.
 *
 * How it works:
 * - d3-shape (pie/arc) only computes the segment geometry; React renders
 *   the SVG paths and labels itself, once, before the spin starts.
 * - The spin runs as a CSS transition on the wheel container, so the
 *   browser animates it on the compositor thread, and it stays smooth even
 *   when the main thread is busy.
 * - Up to MAX_WHEEL_SEGMENTS unique eligible users are sampled onto the
 *   wheel and the winner (preWinner if set) is planted at a known segment.
 * - Labels are fitted per segment before mount: font scales down with the
 *   segment angle and long nicknames are ellipsis via canvas measureText.
 * - After the wheel stops, the winner's name and a confirm button appear.
 *   Escape or clicking the backdrop closes without picking a winner.
 * - A small rAF loop mirrors the same easing curve in JS, but only to play
 *   a tick sound whenever a segment boundary crosses the needle. The first
 *   ticks walk down TICK_SOUNDS from the highest pitch to the lowest, then
 *   the lowest one repeats for the rest of the spin.
 */
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { arc, pie } from 'd3-shape';

import messages from './messages';
import { BADGE_ORDER, BADGE_SETS } from '../ChatView/badgeSets';
import tickSound1 from './assets/FortuneWheelSound1.mp3';
import tickSound2 from './assets/FortuneWheelSound2.mp3';
import tickSound3 from './assets/FortuneWheelSound3.mp3';
import tickSound4 from './assets/FortuneWheelSound4.mp3';
import tickSound5 from './assets/FortuneWheelSound5.mp3';
import tickSound6 from './assets/FortuneWheelSound6.mp3';
import tickSound7 from './assets/FortuneWheelSound7.mp3';
import tickSound8 from './assets/FortuneWheelSound8.mp3';
import tickSound9 from './assets/FortuneWheelSound9.mp3';
import tickSound10 from './assets/FortuneWheelSound10.mp3';
import tickSound11 from './assets/FortuneWheelSound11.mp3';
import tickSound12 from './assets/FortuneWheelSound12.mp3';
import tickSound13 from './assets/FortuneWheelSound13.mp3';
import './style.css';

const MAX_WHEEL_SEGMENTS = 20;
const WHEEL_RADIUS = 300;

const VIEWBOX = `-${WHEEL_RADIUS} -${WHEEL_RADIUS} ${WHEEL_RADIUS * 2} ${WHEEL_RADIUS * 2}`;
const RIM_WIDTH = 6;
const SEGMENT_STROKE = 2;
const SEGMENT_RADIUS = WHEEL_RADIUS - RIM_WIDTH - SEGMENT_STROKE / 2;
const RIM_RADIUS = WHEEL_RADIUS - RIM_WIDTH / 2;
const HUB_RADIUS = 40;
const LABEL_INNER_RADIUS = 70;
const LABEL_OUTER_RADIUS = SEGMENT_RADIUS - 15;
const LABEL_RADIUS = (LABEL_INNER_RADIUS + LABEL_OUTER_RADIUS) / 2;

const MAX_FONT_SIZE = 22;
const MIN_FONT_SIZE = 13;
const SEGMENT_COLORS = [
  { fill: '#c4523f', labelFill: '#ffffff' },
  { fill: '#d8a233', labelFill: '#232b36' },
  { fill: '#5ba85a', labelFill: '#232b36' },
  { fill: '#4a72b8', labelFill: '#ffffff' },
  { fill: '#7c3aa8', labelFill: '#ffffff' },
  { fill: '#67c295', labelFill: '#232b36' },
  { fill: '#b85b1f', labelFill: '#ffffff' },
  { fill: '#2e3a4e', labelFill: '#ffffff' },
];
const segmentColor = (index, count) => {
  let i = index % SEGMENT_COLORS.length;
  if (index === count - 1 && i === 0) i = 3;
  return SEGMENT_COLORS[i];
};

const MIN_TICK_GAP_MS = 70;

// ordered from the highest pitch to the lowest: each tick steps one sound
// down the scale, and once the last one is reached it carries the rest of
// the spin on its own
const TICK_SOUNDS = [
  tickSound1,
  tickSound2,
  tickSound3,
  tickSound4,
  tickSound5,
  tickSound6,
  tickSound7,
  tickSound8,
  tickSound9,
  tickSound10,
  tickSound11,
  tickSound12,
  tickSound13,
];

// JS copy of the CSS cubic-bezier() function, used only to time tick sounds
const makeCubicBezier = (x1, y1, x2, y2) => {
  const ax = 3 * x1 - 3 * x2 + 1;
  const bx = 3 * x2 - 6 * x1;
  const cx = 3 * x1;
  const ay = 3 * y1 - 3 * y2 + 1;
  const by = 3 * y2 - 6 * y1;
  const cy = 3 * y1;

  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const sampleDerivativeX = (t) => (3 * ax * t + 2 * bx) * t + cx;

  const solveT = (x) => {
    let t = x;
    for (let i = 0; i < 8; i += 1) {
      const dx = sampleX(t) - x;
      if (Math.abs(dx) < 1e-6) return t;
      const d = sampleDerivativeX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= dx / d;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    for (let i = 0; i < 20; i += 1) {
      const dx = sampleX(t) - x;
      if (Math.abs(dx) < 1e-6) return t;
      if (dx > 0) hi = t;
      else lo = t;
      t = (lo + hi) / 2;
    }
    return t;
  };

  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return sampleY(solveT(x));
  };
};

// one curve shared by the CSS transition (visuals) and the JS ease (sounds).
// It leaves the start at full speed (steep initial slope) and spends the rest
// of the spin coasting down to a stop.
const ROLLER_BEZIER = [0.1, 0.55, 0.15, 1];
const rollerEase = makeCubicBezier(...ROLLER_BEZIER);

const BADGE_GAP = 4;

// shrink the font to fit maxWidth, then ellipsis what still overflows
const fitLabel = (measure, title, maxWidth, baseSize) => {
  let fontSize = baseSize;
  let width = measure(title, fontSize);
  if (width > maxWidth) {
    fontSize = Math.max(MIN_FONT_SIZE, fontSize * (maxWidth / width));
    width = measure(title, fontSize);
  }
  if (width <= maxWidth) return { text: title, fontSize, width };
  let text = title;
  while (text.length > 1 && measure(`${text}…`, fontSize) > maxWidth) {
    text = text.slice(0, -1);
  }
  text = `${text}…`;
  return { text, fontSize, width: measure(text, fontSize) };
};

// same badge resolution as InternalChatBadges, but as plain hrefs for SVG
const resolveBadges = (user) => {
  const badgeSet = BADGE_SETS[user.platform] || BADGE_SETS.twitch;
  const badges = user.badges || [];
  return BADGE_ORDER.filter(
    (badge) => badges.includes(badge.key) && badgeSet[badge.key]
  ).map((badge) => ({ key: badge.key, href: badgeSet[badge.key] }));
};

const makeTextMeasurer = () => {
  const context = document.createElement('canvas').getContext?.('2d');
  if (!context) {
    // canvas is unavailable (e.g. jsdom) - fall back to a width estimate
    return (text, fontSize) => text.length * fontSize * 0.6;
  }
  return (text, fontSize) => {
    context.font = `bold ${fontSize}px Roboto, sans-serif`;
    return context.measureText(text).width;
  };
};

const FortuneWheelRaffle = (props) => {
  // the sample, the winner and the spin are drawn once, before the first
  // render, so the wheel never re-renders itself into a new layout
  const [{ users, winner, rotation, segmentDeg }] = useState(() => {
    let eligibleUsers = props.userArray.filter(
      (user) => user.isEligible === true
    );
    if (props.giveawayReq === 1) {
      eligibleUsers = eligibleUsers.filter(
        (user) => user.isSubscriber !== false
      );
    }
    if (eligibleUsers.length === 0) {
      return { users: [], winner: null, rotation: 0, segmentDeg: 0 };
    }

    // sample up to MAX_WHEEL_SEGMENTS unique users (partial Fisher-Yates),
    // then plant the winner at winnerIndex
    const pool = [...eligibleUsers];
    const count = Math.min(pool.length, MAX_WHEEL_SEGMENTS);
    for (let i = 0; i < count; i += 1) {
      const j = i + Math.floor(Math.random() * (pool.length - i));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const sample = pool.slice(0, count);
    const winnerIndex = Math.floor(Math.random() * count);
    if (props.preWinner) {
      const existingIndex = sample.findIndex(
        (user) => user.id === props.preWinner.id
      );
      if (existingIndex !== -1) {
        sample[existingIndex] = sample[winnerIndex];
      }
      sample[winnerIndex] = props.preWinner;
    }

    // spin so the winner's segment stops under the needle at the top,
    // with a random offset that stays inside the segment
    const degPerSegment = 360 / count;
    const midAngle = (winnerIndex + 0.5) * degPerSegment;
    const maxOffset = degPerSegment * 0.4;
    const jitter = (Math.random() * 2 - 1) * maxOffset;
    const fullSpins = Math.ceil(props.duration / 2);
    return {
      users: sample,
      winner: sample[winnerIndex],
      rotation: -(fullSpins * 360 + midAngle + jitter),
      segmentDeg: degPerSegment,
    };
  });
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);
  const movableRef = useRef(null);
  const audioCtx = useRef(null);
  const tickBuffers = useRef([]);
  const rafId = useRef(null);

  const playTick = (index) => {
    const ctx = audioCtx.current;
    const buffer = tickBuffers.current[Math.min(index, TICK_SOUNDS.length - 1)];
    if (!ctx || !buffer) return;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
  };

  const closeImmediately = () => {
    props.onClose();
    clearTimeout(timerRef.current);
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
  };

  const confirmWinner = () => {
    if (winner) {
      props.onWin(winner.id);
    }
  };

  // segment geometry and fitted labels, computed once per user sample
  const segments = useMemo(() => {
    if (users.length === 0) return [];
    const slices = pie().value(1).sort(null)(users);
    const arcGen = arc().innerRadius(0).outerRadius(SEGMENT_RADIUS);
    const measure = makeTextMeasurer();
    const segmentAngle = (2 * Math.PI) / users.length;
    // the label may not be taller than the slice is wide at its midpoint
    const chord = 2 * LABEL_RADIUS * Math.sin(segmentAngle / 2);
    const baseSize = Math.min(MAX_FONT_SIZE, chord * 0.5);
    const maxWidth = LABEL_OUTER_RADIUS - LABEL_INNER_RADIUS;
    return slices.map((slice, index) => {
      const user = slice.data;
      const badges = resolveBadges(user);
      const badgeSize = Math.round(baseSize);
      const badgesWidth = badges.length * (badgeSize + BADGE_GAP);
      const label = fitLabel(
        measure,
        user.title,
        maxWidth - badgesWidth,
        baseSize
      );
      return {
        path: arcGen(slice),
        ...segmentColor(index, users.length),
        // d3 angle 0 points up, SVG rotate(0) points right, hence -90
        labelRotate:
          (((slice.startAngle + slice.endAngle) / 2) * 180) / Math.PI - 90,
        badges,
        badgeSize,
        badgesWidth,
        // badges + nickname centered together on the slice's radial axis
        startX: -(badgesWidth + label.width) / 2,
        ...label,
        user,
      };
    });
  }, [users]);

  useEffect(() => {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (AudioContextCtor) {
      const ctx = new AudioContextCtor();
      audioCtx.current = ctx;
      ctx.resume().catch(() => {});
      Promise.all(
        TICK_SOUNDS.map((src) =>
          fetch(src)
            .then((response) => response.arrayBuffer())
            .then((data) => ctx.decodeAudioData(data))
        )
      )
        .then((buffers) => {
          tickBuffers.current = buffers;
        })
        .catch(() => {});
    }

    if (users.length === 0) return undefined;

    const durationMs = props.duration * 1000;

    // animate via CSS transition - runs off the main thread, always smooth
    const movable = movableRef.current;
    if (movable) {
      movable.style.transition = 'none';
      movable.style.transform = 'rotate(0deg)';
      movable.getBoundingClientRect(); // force reflow so the spin starts at 0
      movable.style.transition = `transform ${durationMs}ms cubic-bezier(${ROLLER_BEZIER.join(', ')})`;
      movable.style.transform = `rotate(${rotation}deg)`;
    }

    // rAF loop only follows the animation's progress to play the tick sounds
    let startTime = null;
    let lastSegmentsCrossed = null;
    let lastTickAt = -Infinity;
    let ticksPlayed = 0;

    const step = (now) => {
      if (startTime === null) startTime = now;
      const p = Math.min((now - startTime) / durationMs, 1);
      const currentRotation = rotation * rollerEase(p);

      const segmentsCrossed = Math.floor(
        Math.abs(currentRotation) / segmentDeg
      );
      if (lastSegmentsCrossed === null) lastSegmentsCrossed = segmentsCrossed;
      if (
        segmentsCrossed > lastSegmentsCrossed &&
        now - lastTickAt >= MIN_TICK_GAP_MS
      ) {
        playTick(ticksPlayed);
        ticksPlayed += 1;
        lastTickAt = now;
      }
      lastSegmentsCrossed = segmentsCrossed;

      if (p < 1) {
        rafId.current = requestAnimationFrame(step);
      } else {
        rafId.current = null;
      }
    };
    rafId.current = requestAnimationFrame(step);

    timerRef.current = setTimeout(
      () => {
        setFinished(true);
      },
      (props.duration + 1) * 1000
    );

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      if (audioCtx.current) {
        audioCtx.current.close().catch(() => {});
        audioCtx.current = null;
      }
    };
  }, [props.duration, users.length, rotation, segmentDeg]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeImmediately();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="fwheel-root">
      <button
        aria-label="stop the wheel immediately"
        className="fwheel-backdrop"
        onClick={closeImmediately}
        type="button"
      />
      <div className="fwheel-dialog">
        <div className="fwheel-box">
          <div className="fwheel-movable" ref={movableRef}>
            <svg className="fwheel-svg" viewBox={VIEWBOX}>
              <defs>
                <radialGradient
                  id="fwheel-hub-shine"
                  cx="0.4"
                  cy="0.35"
                  r="0.9"
                >
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#d2d6db" />
                </radialGradient>
              </defs>
              {segments.map((segment, index) => (
                <g key={index}>
                  <path
                    d={segment.path}
                    fill={segment.fill}
                    stroke="#ffffff"
                    strokeWidth={SEGMENT_STROKE}
                  />
                  <g
                    transform={`rotate(${segment.labelRotate}) translate(${LABEL_RADIUS}, 0)`}
                  >
                    {segment.badges.map((badge, badgeIndex) => (
                      <image
                        key={badge.key}
                        href={badge.href}
                        x={
                          segment.startX +
                          badgeIndex * (segment.badgeSize + BADGE_GAP)
                        }
                        y={-segment.badgeSize / 2}
                        width={segment.badgeSize}
                        height={segment.badgeSize}
                      />
                    ))}
                    <text
                      className="fwheel-label"
                      x={
                        segment.startX + segment.badgesWidth + segment.width / 2
                      }
                      fontSize={segment.fontSize}
                      fill={segment.user.color || segment.labelFill}
                    >
                      {segment.text}
                    </text>
                  </g>
                </g>
              ))}
              <circle
                r={RIM_RADIUS}
                fill="none"
                stroke="#ffffff"
                strokeWidth={RIM_WIDTH}
              />
              <circle
                className="fwheel-hub"
                r={HUB_RADIUS}
                fill="url(#fwheel-hub-shine)"
                stroke="#c3c8ce"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="fwheel-needle" />
        </div>
        {finished && winner !== null && (
          <div className="fwheel-winner">
            <span
              className="fwheel-winner-name"
              style={winner.color ? { color: winner.color } : undefined}
            >
              {winner.title}
            </span>
            <button
              className="fwheel-close-btn"
              onClick={confirmWinner}
              type="button"
            >
              <FormattedMessage {...messages.continueBtn} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

FortuneWheelRaffle.propTypes = {
  duration: PropTypes.number,
  giveawayReq: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onWin: PropTypes.func.isRequired,
  preWinner: PropTypes.object,
  userArray: PropTypes.array,
};
FortuneWheelRaffle.defaultProps = {
  duration: 7,
};

const areEqual = (prevProps, nextProps) =>
  prevProps.duration === nextProps.duration &&
  prevProps.onClose === nextProps.onClose &&
  prevProps.onWin === nextProps.onWin;

export default memo(FortuneWheelRaffle, areEqual);
