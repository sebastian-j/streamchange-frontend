import React, { useEffect, useState } from 'react';
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
  const [users, setUsers] = useState([]);
  const [scrollSize, setScrollSize] = useState(0);
  const [winner, setWinner] = useState(null);
  const [timer, setTimer] = useState(null);

  const closeImmediately = () => {
    props.onClose();
    clearTimeout(timer);
  };

  useEffect(() => {
    let eligibleUsers = props.userArray.filter(
      (user) => user.isEligible === true,
    );
    if (props.giveawayReq === 1) {
      eligibleUsers = eligibleUsers.filter((user) => user.isSponsor !== false);
    }
    const shuffled = [];
    for (let i = 0; i < 30 + props.duration * 3; i += 1) {
      shuffled.push(
        eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)],
      );
    }
    const winnerIndex =
      Math.floor(Math.random() * 10) + 10 + props.duration * 3;
    if (props.preWinner) shuffled[winnerIndex] = props.preWinner;
    const scroll = -(winnerIndex * 150 + Math.floor(Math.random() * 65) - 290);
    setUsers(shuffled);
    setTimeout(() => setScrollSize(scroll), 10);
    setWinner(shuffled[winnerIndex]);
    setTimer(
      setTimeout(() => {
        props.onWin(shuffled[winnerIndex].id);
      }, (props.duration + 1) * 1000),
    );
  }, []);

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
                {users.map((item) => (
                  <td key={Math.round(Math.random() * 10000000)}>
                    <div className="roller-cell">
                      <img src={item.imageUrl} alt="logo" />
                      <span className="roller-label">{item.title}</span>
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
          {winner !== null && winner.title}
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
