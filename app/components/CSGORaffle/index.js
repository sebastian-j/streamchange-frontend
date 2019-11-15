import React from 'react';
import PropTypes from 'prop-types';
import db from '../YoutubeWorker/db';
import './style.css';

export default class CSGORaffle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], scrollSize: 0, winner: null };
  }

  static getDerivedStateFromError() {
    return { error: true };
  }

  componentDidMount() {
    db.table('users')
      .filter(function(user) {
        return user.isEligible === true;
      })
      .toArray()
      .then(items => {
        const shuffled = [];
        for (let i = 0; i < 50; i += 1) {
          shuffled.push(items[Math.floor(Math.random() * items.length)]);
        }
        const winnerIndex = Math.floor(Math.random() * 10) + 35;
        const scrollSize = -(
          winnerIndex * 150 +
          Math.floor(Math.random() * 65) -
          290
        );
        this.setState({
          users: shuffled,
          scrollSize,
          winner: shuffled[winnerIndex],
        });
      });
  }

  render() {
    return (
      <div className="dialog-root">
        <div className="dialog-backdrop" onClick={this.props.onClose} />
        <div className="raffle-dialog">
          <div className="roller-box">
            <div className="roller-needle" />
            <table>
              <tbody>
                <tr
                  className="roller-movable"
                  style={{ left: this.state.scrollSize }}
                >
                  {this.state.users.map(item => (
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
          <span className="raffle-winner">
            {this.state.winner !== null && this.state.winner.title}
          </span>
        </div>
      </div>
    );
  }
}

CSGORaffle.propTypes = {
  onClose: PropTypes.func.isRequired,
};
