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
 * - After the roller stops, the winner's name and a confirm button appear.
 *   Escape or clicking the backdrop closes without picking a winner.
 */
import { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { getSafeColor } from '../../utils/colors';

import messages from './messages';
import {
  makeSelectGiveawayPreWinner,
  makeSelectGiveawayRequirement,
} from '../GiveawayRules/selectors';
import { makeSelectUserArray } from '../UserList/selectors';
import InternalChatBadges from '../ChatView/InternalChatBadges';
import tickSoundSrc from '../../assets/tick.mp3';
import './style.css';

const CELL_HEIGHT = 77;
const BOX_HEIGHT = CELL_HEIGHT * 5;
const NEEDLE_Y = BOX_HEIGHT / 2;
const MIN_TICK_GAP_MS = 70;
const MAX_WINNER_OFFSET = 33;

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

const VerticalRaffle = (props) => {
  const [users, setUsers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(null);
  const movableRef = useRef(null);
  const audioCtx = useRef(null);
  const tickBuffer = useRef(null);
  const rafId = useRef(null);

  const playTick = () => {
    const ctx = audioCtx.current;
    const buffer = tickBuffer.current;
    if (!ctx || !buffer) return;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
  };

  const closeImmediately = () => {
    props.onClose();
    clearTimeout(timer);
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
  };

  const confirmWinner = () => {
    if (winner) {
      props.onWin(winner.id);
    }
  };

  useEffect(() => {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (AudioContextCtor) {
      const ctx = new AudioContextCtor();
      audioCtx.current = ctx;
      ctx.resume().catch(() => {});
      fetch(tickSoundSrc)
        .then((response) => response.arrayBuffer())
        .then((data) => ctx.decodeAudioData(data))
        .then((buffer) => {
          tickBuffer.current = buffer;
        })
        .catch(() => {});
    }

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
    const selectedWinner = shuffled[winnerIndex];
    const scroll = -(
      winnerIndex * CELL_HEIGHT -
      (BOX_HEIGHT - CELL_HEIGHT) / 2 +
      Math.floor(Math.random() * (2 * MAX_WINNER_OFFSET + 1)) -
      MAX_WINNER_OFFSET
    );
    setUsers(shuffled);
    setWinner(selectedWinner);

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
        playTick();
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

    setTimer(
      setTimeout(
        () => {
          setFinished(true);
        },
        (props.duration + 1) * 1000
      )
    );

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      if (audioCtx.current) {
        audioCtx.current.close().catch(() => {});
        audioCtx.current = null;
      }
    };
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
    <div className="vraffle-root">
      <button
        aria-label="stop the raffle immediately"
        className="vraffle-backdrop"
        onClick={closeImmediately}
        type="button"
      />
      <div className="vraffle-dialog">
        <div className="vroller-box">
          <div className="vroller-needle" />
          <div className="vroller-movable" ref={movableRef}>
            {users.map((item, index) => (
              <div className="vroller-cell" key={index}>
                <InternalChatBadges message={item} />
                <span
                  className="vroller-nickname"
                  style={item.color ? { color: getSafeColor(item.color, '#000000') } : undefined}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        {finished && winner !== null && (
          <div className="vraffle-winner">
            <span
              className="vraffle-winner-name"
              style={winner.color ? { color: getSafeColor(winner.color, '#131b24') } : undefined}
            >
              {winner.title}
            </span>
            <button
              className="vraffle-close-btn"
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

VerticalRaffle.propTypes = {
  duration: PropTypes.number,
  giveawayReq: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onWin: PropTypes.func.isRequired,
  preWinner: PropTypes.object,
  userArray: PropTypes.array,
};
VerticalRaffle.defaultProps = {
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

export default connect(mapStateToProps, null)(memo(VerticalRaffle, areEqual));
