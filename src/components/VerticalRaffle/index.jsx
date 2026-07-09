import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import {
  makeSelectGiveawayPreWinner,
  makeSelectGiveawayRequirement,
} from '../GiveawayRules/selectors';
import { makeSelectUserArray } from '../UserList/selectors';
import InternalChatBadges from '../ChatView/InternalChatBadges';
import tickSoundSrc from '../../assets/tick3.mp3';
import './style.css';

const CELL_HEIGHT = 64;
const BOX_HEIGHT = CELL_HEIGHT * 5;
const TICK_POOL_SIZE = 6;
// Inverse of the CSS roller's ease-out curve: maps distance progress to
// time progress, so ticks are dense while the strip is fast and spread
// out as it decelerates.
const tickTimeProgress = (p) => 1 - (1 - p) ** (1 / 5);

const VerticalRaffle = (props) => {
  const [users, setUsers] = useState([]);
  const [scrollSize, setScrollSize] = useState(0);
  const [winner, setWinner] = useState(null);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(null);
  const audioPool = useRef(null);
  const poolIndex = useRef(0);
  const tickTimeouts = useRef([]);

  const playTick = () => {
    if (!audioPool.current) return;
    const audio = audioPool.current[poolIndex.current];
    poolIndex.current = (poolIndex.current + 1) % TICK_POOL_SIZE;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const clearTicks = () => {
    tickTimeouts.current.forEach((id) => clearTimeout(id));
    tickTimeouts.current = [];
  };

  const closeImmediately = () => {
    props.onClose();
    clearTimeout(timer);
    clearTicks();
  };

  const confirmWinner = () => {
    if (winner) {
      props.onWin(winner.id);
    }
  };

  useEffect(() => {
    audioPool.current = Array.from(
      { length: TICK_POOL_SIZE },
      () => new Audio(tickSoundSrc)
    );

    let eligibleUsers = props.userArray.filter(
      (user) => user.isEligible === true
    );
    if (props.giveawayReq === 1) {
      eligibleUsers = eligibleUsers.filter((user) => user.isSponsor !== false);
    }
    const shuffled = [];
    for (let i = 0; i < 30 + props.duration * 3; i += 1) {
      shuffled.push(
        eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)]
      );
    }
    const winnerIndex =
      Math.floor(Math.random() * 10) + 10 + props.duration * 3;
    if (props.preWinner) shuffled[winnerIndex] = props.preWinner;
    // Center the winner cell under the needle, with a slight random offset
    const scroll = -(
      winnerIndex * CELL_HEIGHT -
      (BOX_HEIGHT - CELL_HEIGHT) / 2 +
      Math.floor(Math.random() * 40) -
      20
    );
    setUsers(shuffled);
    setTimeout(() => setScrollSize(scroll), 10);
    setWinner(shuffled[winnerIndex]);

    const durationMs = props.duration * 1000;
    const totalTicks = Math.round(Math.abs(scroll) / CELL_HEIGHT);
    for (let i = 1; i <= totalTicks; i += 1) {
      const tickTime = durationMs * tickTimeProgress(i / totalTicks);
      tickTimeouts.current.push(setTimeout(playTick, tickTime));
    }

    setTimer(
      setTimeout(
        () => {
          setFinished(true);
        },
        (props.duration + 1) * 1000
      )
    );

    return () => clearTicks();
  }, []);

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
          <div
            className="vroller-movable"
            style={{
              transform: `translateY(${scrollSize}px)`,
              transitionDuration: `${props.duration}s`,
            }}
          >
            {users.map((item, index) => (
              <div className="vroller-cell" key={index}>
                <InternalChatBadges message={item} />
                <span
                  className="vroller-nickname"
                  style={item.color ? { color: item.color } : undefined}
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
              style={winner.color ? { color: winner.color } : undefined}
            >
              {winner.title}
            </span>
            <button
              className="vraffle-close-btn"
              onClick={confirmWinner}
              type="button"
            >
              <FormattedMessage {...messages.closeBtn} />
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

export default connect(mapStateToProps, null)(VerticalRaffle);
