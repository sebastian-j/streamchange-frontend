/**
 * VerticalRaffle
 *
 * Full-screen giveaway animation: a vertical roller of nicknames scrolls past
 * a fixed needle and slows down until the winner stops under it.
 *
 * How it works:
 * - On mount, random eligible users fill the roller and the winner
 *   (preWinner if set) is planted at a known index.
 * - The scroll runs as a CSS transition, so the browser animates it on the
 *   compositor thread and it stays smooth even when the main thread is busy.
 * - A small rAF loop mirrors the same easing curve in JS, but only to play
 *   tick sounds when cell borders cross the needle.
 * - After the roller stops, the winner's name and a confirm button appear,
 *   together with the celebration: flash, shockwave, shake, confetti and the
 *   win sound.
 *   Escape or clicking the backdrop closes without picking a winner.
 */
import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import confetti from 'canvas-confetti';
import { getSafeColor } from '../../utils/colors';

import messages from './messages';
import InternalChatBadges from '../ChatView/InternalChatBadges';
import tickSoundSrc from '../../assets/tick.mp3';
import winSoundSrc from './assets/win.mp3';
import './style.css';

const CELL_HEIGHT = 77;
const BOX_HEIGHT = CELL_HEIGHT * 5;
const NEEDLE_Y = BOX_HEIGHT / 2;
const MIN_TICK_GAP_MS = 70;
const MAX_WINNER_OFFSET = 33;
// beat of silence after the roller stops, before the winner reveal fires
const WINNER_REVEAL_DELAY_MS = 400;

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

// one curve shared by the CSS transition (visuals) and the JS ease (sounds)
const ROLLER_BEZIER = [0.18, 0.17, 0.02, 1];
const rollerEase = makeCubicBezier(...ROLLER_BEZIER);

const CONFETTI_COLORS = ['#ffce0a', '#ffffff', '#ff8a00', '#ffe680', '#00d5ff'];
// side cannons fire this many volleys, each one weaker than the last
const CONFETTI_VOLLEYS = [
  { delay: 250, count: 120 },
  { delay: 900, count: 90 },
  { delay: 1600, count: 60 },
];

// three rings chasing each other outwards instead of one lonely pulse
const SHOCKWAVE_DELAYS = [0, 0.16, 0.32];

const FIREWORK_INTERVAL_MS = 300;
const FIREWORK_DURATION_MS = 3000;

const EMBER_INTERVAL_MS = 140;
const EMBER_DURATION_MS = 5000;

/**
 * Full-screen celebration: a center cannon, volleys from the bottom corners,
 * and shells bursting overhead for a few seconds after.
 * Returns a stop function that cancels everything still in flight.
 */
const fireCelebration = () => {
  const base = {
    colors: CONFETTI_COLORS,
    zIndex: 9999,
    disableForReducedMotion: true,
  };

  confetti({
    ...base,
    particleCount: 220,
    spread: 140,
    startVelocity: 55,
    scalar: 1.3,
    origin: { x: 0.5, y: 0.65 },
  });

  const timers = CONFETTI_VOLLEYS.map(({ delay, count }) =>
    setTimeout(() => {
      confetti({
        ...base,
        particleCount: count,
        angle: 60,
        spread: 70,
        startVelocity: 65,
        scalar: 1.1,
        origin: { x: 0, y: 0.8 },
      });
      confetti({
        ...base,
        particleCount: count,
        angle: 120,
        spread: 70,
        startVelocity: 65,
        scalar: 1.1,
        origin: { x: 1, y: 0.8 },
      });
    }, delay)
  );

  // fireworks: a full 360 spread with heavy decay reads as a shell bursting,
  // where the flat spread of the cannons above reads as confetti being thrown
  const fireworksEnd = Date.now() + FIREWORK_DURATION_MS;
  const fireworks = setInterval(() => {
    if (Date.now() > fireworksEnd) {
      clearInterval(fireworks);
      return;
    }
    confetti({
      ...base,
      particleCount: 70,
      spread: 360,
      startVelocity: 26,
      decay: 0.91,
      gravity: 0.7,
      ticks: 160,
      scalar: 1.1,
      shapes: ['star', 'circle'],
      origin: { x: 0.12 + Math.random() * 0.76, y: 0.1 + Math.random() * 0.35 },
    });
  }, FIREWORK_INTERVAL_MS);

  // embers: negative gravity turns confetti into sparks drifting up off the
  // bottom edge. Quiet on its own, but it keeps the screen alive underneath
  // the loud effects instead of letting it go dead between bursts
  const embersEnd = Date.now() + EMBER_DURATION_MS;
  const embers = setInterval(() => {
    if (Date.now() > embersEnd) {
      clearInterval(embers);
      return;
    }
    confetti({
      ...base,
      particleCount: 3,
      spread: 55,
      startVelocity: 14,
      gravity: -0.32,
      decay: 0.96,
      ticks: 260,
      scalar: 0.7,
      origin: { x: Math.random(), y: 1.05 },
    });
  }, EMBER_INTERVAL_MS);

  return () => {
    timers.forEach(clearTimeout);
    clearInterval(fireworks);
    clearInterval(embers);
    confetti.reset();
  };
};

// decode an mp3 into the given ref up front, so playback is instant later on
const loadSound = (ctx, src, target) =>
  fetch(src)
    .then((response) => response.arrayBuffer())
    .then((data) => ctx.decodeAudioData(data))
    .then((buffer) => {
      target.current = buffer;
    })
    .catch(() => {});

const VerticalRaffle = (props) => {
  const [{ users, winner, scroll }] = useState(() => {
    let eligibleUsers = props.userArray.filter(
      (user) => user.isEligible === true
    );
    if (props.giveawayReq === 1) {
      eligibleUsers = eligibleUsers.filter((user) => user.isSponsor !== false);
    }
    // fill the roller with random users, then plant the winner at winnerIndex
    const shuffled = [];
    for (let i = 0; i < 30 + props.duration * 3; i += 1) {
      shuffled.push(
        eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)]
      );
    }
    const winnerIndex =
      Math.floor(Math.random() * 10) + 10 + props.duration * 3;
    if (props.preWinner) shuffled[winnerIndex] = props.preWinner;
    return {
      users: shuffled,
      winner: shuffled[winnerIndex],
      scroll: -(
        winnerIndex * CELL_HEIGHT -
        (BOX_HEIGHT - CELL_HEIGHT) / 2 +
        Math.floor(Math.random() * (2 * MAX_WINNER_OFFSET + 1)) -
        MAX_WINNER_OFFSET
      ),
    };
  });
  const [finished, setFinished] = useState(false);
  const won = finished && winner !== null;
  const celebrate = won && props.effectsOn;
  const timerRef = useRef(null);
  const movableRef = useRef(null);
  const audioCtx = useRef(null);
  const tickBuffer = useRef(null);
  const winBuffer = useRef(null);
  const rafId = useRef(null);

  const playSample = (bufferRef, volume = 1) => {
    const ctx = audioCtx.current;
    const buffer = bufferRef.current;
    if (!props.soundOn || !ctx || !buffer || ctx.state === 'closed') return;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    if (volume === 1) {
      source.connect(ctx.destination);
    } else {
      const gain = ctx.createGain();
      gain.gain.value = volume;
      source.connect(gain);
      gain.connect(ctx.destination);
    }
    source.start();
  };

  const confirmWinner = () => {
    if (winner) {
      props.onWin(winner.id);
    }
  };

  const closeImmediately = () => {
    if (won) {
      confirmWinner();
      return;
    }
    props.onClose();
    clearTimeout(timerRef.current);
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
  };

  useEffect(() => {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (AudioContextCtor) {
      const ctx = new AudioContextCtor();
      audioCtx.current = ctx;
      ctx.resume().catch(() => {});
      loadSound(ctx, tickSoundSrc, tickBuffer);
      loadSound(ctx, winSoundSrc, winBuffer);
    }

    const durationMs = props.duration * 1000;

    // animate via CSS transition - runs off the main thread, so it always stays smooth
    const movable = movableRef.current;
    if (movable) {
      movable.style.transition = 'none';
      movable.style.transform = 'translateY(0px)';
      movable.getBoundingClientRect(); // force reflow so the transition starts at 0
      movable.style.transition = `transform ${durationMs}ms cubic-bezier(${ROLLER_BEZIER.join(', ')})`;
      movable.style.transform = `translateY(${scroll}px)`;
    }

    // rAF loop only follows the animation's progress to play the tick sounds
    let startTime = null;
    let lastLinesCrossed = null;
    let lastTickAt = -Infinity;

    const step = (now) => {
      if (startTime === null) startTime = now;
      const p = Math.min((now - startTime) / durationMs, 1);
      const currentY = scroll * rollerEase(p);

      const linesCrossed = Math.floor(
        (Math.abs(currentY) + NEEDLE_Y) / CELL_HEIGHT
      );
      if (lastLinesCrossed === null) lastLinesCrossed = linesCrossed;
      if (
        linesCrossed > lastLinesCrossed &&
        now - lastTickAt >= MIN_TICK_GAP_MS
      ) {
        playSample(tickBuffer);
        lastTickAt = now;
      }
      lastLinesCrossed = linesCrossed;

      if (p < 1) {
        rafId.current = requestAnimationFrame(step);
      } else {
        rafId.current = null;
      }
    };
    rafId.current = requestAnimationFrame(step);

    timerRef.current = setTimeout(() => {
      setFinished(true);
    }, durationMs + WINNER_REVEAL_DELAY_MS);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      if (audioCtx.current) {
        audioCtx.current.close().catch(() => {});
        audioCtx.current = null;
      }
    };
  }, [props.duration, scroll]);

  useEffect(() => {
    if (!celebrate) return undefined;
    playSample(winBuffer, 0.8);
    return fireCelebration();
  }, [celebrate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeImmediately();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  // the dialog is portaled to <body> so its z-index can clear the confetti
  // canvas without dragging the backdrop and rays up with it - see style.css
  return (
    <>
      <div className={`vraffle-root${celebrate ? ' vraffle-root--win' : ''}`}>
        <button
          aria-label="stop the raffle immediately"
          className="vraffle-backdrop"
          onClick={closeImmediately}
          type="button"
        />
        {celebrate && (
          <>
            <div className="vraffle-rays" aria-hidden="true" />
            <div className="vraffle-flash" aria-hidden="true" />
            {SHOCKWAVE_DELAYS.map((delay) => (
              <div
                aria-hidden="true"
                className="vraffle-shockwave"
                key={delay}
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </>
        )}
      </div>
      {createPortal(
        <div className="vraffle-dialog-portal">
          <div
            className={`vraffle-dialog${celebrate ? ' vraffle-dialog--win' : ''}`}
          >
            <div
              className={`vroller-box${celebrate ? ' vroller-box--win' : ''}`}
            >
              <div className="vroller-needle" />
              <div className="vroller-movable" ref={movableRef}>
                {users.map((item, index) => (
                  <div className="vroller-cell" key={index}>
                    <InternalChatBadges message={item} />
                    <span
                      className="vroller-nickname"
                      style={
                        item.color
                          ? { color: getSafeColor(item.color, '#000000') }
                          : undefined
                      }
                    >
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`vraffle-winner${won ? ' vraffle-winner--visible' : ''}`}
            >
              <span
                className="vraffle-winner-name"
                style={
                  winner?.color
                    ? { color: getSafeColor(winner.color, '#131b24') }
                    : undefined
                }
              >
                {winner ? winner.title : ' '}
              </span>
              <button
                className="vraffle-close-btn"
                onClick={confirmWinner}
                tabIndex={won ? 0 : -1}
                type="button"
              >
                <FormattedMessage {...messages.continueBtn} />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

VerticalRaffle.propTypes = {
  duration: PropTypes.number,
  effectsOn: PropTypes.bool,
  soundOn: PropTypes.bool,
  giveawayReq: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onWin: PropTypes.func.isRequired,
  preWinner: PropTypes.object,
  userArray: PropTypes.array,
};
VerticalRaffle.defaultProps = {
  duration: 7,
  effectsOn: true,
  soundOn: true,
};

const areEqual = (prevProps, nextProps) =>
  prevProps.duration === nextProps.duration &&
  prevProps.effectsOn === nextProps.effectsOn &&
  prevProps.soundOn === nextProps.soundOn &&
  prevProps.onClose === nextProps.onClose &&
  prevProps.onWin === nextProps.onWin;

export default memo(VerticalRaffle, areEqual);
