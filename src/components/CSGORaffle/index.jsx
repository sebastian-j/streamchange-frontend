import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectGiveawayPreWinner,
  makeSelectGiveawayRequirement,
} from '../GiveawayRules/selectors';
import { makeSelectUserArray } from '../UserList/selectors';
import './style.css';

const CSGORaffle = (props) => {
  const [{ users, winner, scroll }] = useState(() => {
    let eligibleUsers = props.userArray.filter(
      (user) => user.isEligible === true
    );
    if (props.giveawayReq === 1) {
      eligibleUsers = eligibleUsers.filter(
        (user) => user.isSubscriber !== false
      );
    }
    const shuffled = [];
    if (eligibleUsers.length > 0) {
      for (let i = 0; i < 30 + props.duration * 3; i += 1) {
        shuffled.push(
          eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)]
        );
      }
    }
    const winnerIndex =
      Math.floor(Math.random() * 10) + 10 + props.duration * 3;
    if (props.preWinner) shuffled[winnerIndex] = props.preWinner;
    return {
      users: shuffled,
      winner: shuffled[winnerIndex],
      scroll: -(winnerIndex * 150 + Math.floor(Math.random() * 65) - 290),
    };
  });
  const [scrollSize, setScrollSize] = useState(0);
  const timerRef = useRef(null);

  const closeImmediately = () => {
    props.onClose();
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    const scrollTimeout = setTimeout(() => setScrollSize(scroll), 10);
    timerRef.current = setTimeout(
      () => {
        props.onWin(winner.id);
      },
      (props.duration + 1) * 1000
    );
    return () => clearTimeout(scrollTimeout);
  }, [scroll, winner, props]);

  return (
    <div className="dialog-root">
      <button
        aria-label="stop the raffle immediately"
        className="dialog-backdrop"
        onClick={closeImmediately}
        type="button"
      />
      <div className="raffle-dialog">
        <div className="roller-box">
          <div className="roller-needle" />
          <table>
            <tbody>
              <tr
                className="roller-movable"
                style={{
                  left: scrollSize,
                  transitionDuration: `${props.duration}s`,
                }}
              >
                {users.map((item, index) => (
                  <td key={`${index}-${item.id}`}>
                    <div className="roller-cell">
                      <img src={item?.imageUrl} alt="logo" />
                      <span className="roller-label">{item?.title}</span>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <span
          className="raffle-winner"
          style={{ animationDelay: `${props.duration + 0.1}s` }}
        >
          {winner?.title}
        </span>
      </div>
    </div>
  );
};

CSGORaffle.propTypes = {
  duration: PropTypes.number,
  giveawayReq: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onWin: PropTypes.func.isRequired,
  preWinner: PropTypes.object,
  userArray: PropTypes.array,
};
CSGORaffle.defaultProps = {
  duration: 7,
};

const mapStateToProps = createStructuredSelector({
  giveawayReq: makeSelectGiveawayRequirement(),
  preWinner: makeSelectGiveawayPreWinner(),
  userArray: makeSelectUserArray(),
});

export default connect(mapStateToProps, null)(CSGORaffle);
