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
 *   browser animates it on the compositor thread and it stays smooth even
 *   when the main thread is busy.
 * - Up to MAX_WHEEL_SEGMENTS unique eligible users are sampled onto the
 *   wheel and the winner (preWinner if set) is planted at a known segment.
 * - Labels are fitted per segment before mount: font scales down with the
 *   segment angle and long nicknames are ellipsized via canvas measureText.
 * - After the wheel stops, the winner's name and a confirm button appear.
 *   Escape or clicking the backdrop closes without picking a winner.
 */
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { arc, pie } from 'd3-shape';

import messages from './messages';
import { BADGE_ORDER, BADGE_SETS } from '../ChatView/InternalChatBadges';
import {
  makeSelectGiveawayPreWinner,
  makeSelectGiveawayRequirement,
} from '../GiveawayRules/selectors';
import { makeSelectUserArray } from '../UserList/selectors';
import './style.css';

const MAX_WHEEL_SEGMENTS = 20;
// all sizes below are SVG viewBox units; the wheel scales with the dialog
const WHEEL_RADIUS = 300;
const VIEWBOX = `-${WHEEL_RADIUS} -${WHEEL_RADIUS} ${WHEEL_RADIUS * 2} ${WHEEL_RADIUS * 2}`;
const HUB_RADIUS = 40;
const LABEL_INNER_RADIUS = 70;
const LABEL_OUTER_RADIUS = WHEEL_RADIUS - 15;
// labels sit centered on the middle of the slice, along its radial axis
const LABEL_RADIUS = (LABEL_INNER_RADIUS + LABEL_OUTER_RADIUS) / 2;
const MAX_FONT_SIZE = 22;
const MIN_FONT_SIZE = 13;
// distinct muted colours; each fill carries its own label colour so text
// stays readable on both light and dark segments
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
  // keep the last segment from matching the first one it touches
  if (index === count - 1 && i === 0) i = 3;
  return SEGMENT_COLORS[i];
};

const ROLLER_BEZIER = [0.18, 0.17, 0.02, 1];

const BADGE_GAP = 4;

// shrink the font to fit maxWidth, then ellipsize what still overflows
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
  const [users, setUsers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(null);
  const movableRef = useRef(null);

  const closeImmediately = () => {
    props.onClose();
    clearTimeout(timer);
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
    const arcGen = arc().innerRadius(0).outerRadius(WHEEL_RADIUS);
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
    let eligibleUsers = props.userArray.filter(
      (user) => user.isEligible === true
    );
    if (props.giveawayReq === 1) {
      eligibleUsers = eligibleUsers.filter(
        (user) => user.isSubscriber !== false
      );
    }
    if (eligibleUsers.length === 0) return undefined;

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
    setUsers(sample);
    setWinner(sample[winnerIndex]);

    // spin so the winner's segment stops under the needle at the top,
    // with a random offset that stays inside the segment
    const segmentDeg = 360 / count;
    const midAngle = (winnerIndex + 0.5) * segmentDeg;
    const maxOffset = segmentDeg * 0.4;
    const jitter = (Math.random() * 2 - 1) * maxOffset;
    const fullSpins = Math.ceil(props.duration / 2);
    const rotation = -(fullSpins * 360 + midAngle + jitter);
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

    setTimer(
      setTimeout(
        () => {
          setFinished(true);
        },
        (props.duration + 1) * 1000
      )
    );
    return undefined;
  }, [props.duration, props.giveawayReq, props.preWinner, props.userArray]);

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
                    strokeWidth="3"
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
                className="fwheel-hub"
                r={HUB_RADIUS}
                fill="url(#fwheel-hub-shine)"
                stroke="#c3c8ce"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="fwheel-ring" />
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

const mapStateToProps = createStructuredSelector({
  giveawayReq: makeSelectGiveawayRequirement(),
  preWinner: makeSelectGiveawayPreWinner(),
  userArray: makeSelectUserArray(),
});

const areEqual = (prevProps, nextProps) =>
  prevProps.duration === nextProps.duration &&
  prevProps.onClose === nextProps.onClose &&
  prevProps.onWin === nextProps.onWin;

export default connect(
  mapStateToProps,
  null
)(memo(FortuneWheelRaffle, areEqual));
