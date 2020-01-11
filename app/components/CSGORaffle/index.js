import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import db from '../YoutubeWorker/db';
import './style.css';

const CSGORaffle = props => {
  const [users, setUsers] = useState([]);
  const [scrollSize, setScrollSize] = useState(0);
  const [winner, setWinner] = useState(null);
  const [timer, setTimer] = useState(null);

  const closeImmediately = () => {
    props.onClose();
    clearTimeout(timer);
  };

  useEffect(() => {
    db.table('users')
      .filter(user => user.isEligible === true)
      .toArray()
      .then(items => {
        const shuffled = [];
        for (let i = 0; i < 50; i += 1) {
          shuffled.push(items[Math.floor(Math.random() * items.length)]);
        }
        const winnerIndex = Math.floor(Math.random() * 10) + 35;
        const scroll = -(
          winnerIndex * 150 +
          Math.floor(Math.random() * 65) -
          290
        );
        setUsers(shuffled);
        setScrollSize(scroll);
        setWinner(shuffled[winnerIndex]);
        setTimer(
          setTimeout(() => {
            props.onWin(shuffled[winnerIndex].id);
          }, (props.duration + 1) * 1000),
        );
      });
  }, []);

  return (
    <div className="dialog-root">
      <div className="dialog-backdrop" onClick={closeImmediately} />
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
                {users.map(item => (
                  <td>
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
  onClose: PropTypes.func.isRequired,
  onWin: PropTypes.func.isRequired,
};
CSGORaffle.defaultProps = {
  duration: 7,
};

export default CSGORaffle;
