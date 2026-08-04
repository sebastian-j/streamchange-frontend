import { useEffect, useRef, useState } from 'react';

import './style.css';

type UserId = string | number;

type RaffleUser = {
  id: UserId;
  title?: string;
  imageUrl?: string;
  isEligible: boolean;
  isSubscriber?: boolean;
};

type CSGORaffleProps = {
  duration?: number;
  giveawayReq?: number;
  onClose: () => void;
  onWin: (winnerId: UserId) => void;
  preWinner?: RaffleUser;
  userArray: RaffleUser[];
};

type RaffleState = {
  users: RaffleUser[];
  winner?: RaffleUser;
  scroll: number;
};

const CSGORaffle = ({
  duration = 7,
  giveawayReq,
  onClose,
  onWin,
  preWinner,
  userArray,
}: CSGORaffleProps) => {
  const [{ users, winner, scroll }] = useState<RaffleState>(() => {
    let eligibleUsers = userArray.filter((user) => user.isEligible === true);
    if (giveawayReq === 1) {
      eligibleUsers = eligibleUsers.filter(
        (user) => user.isSubscriber !== false
      );
    }
    const shuffled = [];
    if (eligibleUsers.length > 0) {
      for (let i = 0; i < 30 + duration * 3; i += 1) {
        shuffled.push(
          eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)]
        );
      }
    }
    const winnerIndex = Math.floor(Math.random() * 10) + 10 + duration * 3;
    if (preWinner) shuffled[winnerIndex] = preWinner;
    return {
      users: shuffled,
      winner: shuffled[winnerIndex],
      scroll: -(winnerIndex * 150 + Math.floor(Math.random() * 65) - 290),
    };
  });
  const [scrollSize, setScrollSize] = useState<number>(0);
  const timerRef = useRef(null);

  const closeImmediately = () => {
    onClose();
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    const scrollTimeout = setTimeout(() => setScrollSize(scroll), 10);
    timerRef.current = setTimeout(
      () => {
        onWin(winner.id);
      },
      (duration + 1) * 1000
    );
    return () => clearTimeout(scrollTimeout);
  }, [scroll, winner, duration, onWin]);

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
                  transitionDuration: `${duration}s`,
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
          style={{ animationDelay: `${duration + 0.1}s` }}
        >
          {winner?.title}
        </span>
      </div>
    </div>
  );
};

export default CSGORaffle;
