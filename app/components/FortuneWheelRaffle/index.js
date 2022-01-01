import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Howl } from 'howler';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { makeSelectUserArray } from '../UserList/selectors';
import { makeSelectGiveawayRequirement } from '../GiveawayRules/selectors';
import DialogRoot from './DialogRoot';
import FortuneWheelImg from './assets/fortune-wheel-inner.png';
import FortuneWheelBorder from './assets/fortune-wheel-outer.png';
import WheelSound from './assets/FortuneWheelSound.mp3';
import RaffleDialog from './RaffleDialog';
import RaffleWinner from './RaffleWinner';
import WheelItem from './WheelItem';

const WheelImg = styled.img`
  width: 75vh;
`;
const WheelMovable = styled.div`
  transition-timing-function: cubic-bezier(0.18, 0.17, 0.02, 1);
`;
const WheelBorder = styled.img`
  position: absolute;
  width: 75vh;
`;

const FortuneWheelRaffle = (props) => {
  const [users, setUsers] = useState([]);
  const [scrollSize, setScrollSize] = useState(0);
  const [winner, setWinner] = useState(null);
  const [timer, setTimer] = useState(null);
  const [tickSound] = useState(
    new Howl({
      src: [WheelSound],
      sprite: {
        start: [0, 5750],
        tick: [5750, 500],
      },
    }),
  );

  const closeImmediately = () => {
    props.onClose();
    clearTimeout(timer);
    tickSound.stop();
    tickSound.unload();
  };

  useEffect(() => {
    let eligibleUsers = props.userArray.filter(
      (user) => user.isEligible === true,
    );
    if (props.giveawayReq === 1) {
      eligibleUsers = eligibleUsers.filter((user) => user.isSponsor !== false);
    }
    const shuffled = [];
    for (let i = 0; i < 10; i += 1) {
      shuffled.push(
        eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)],
      );
    }
    const winnerIndex = Math.floor(Math.random() * 10);
    const scroll = -(
      winnerIndex * 36 +
      Math.floor(Math.random() * 15) +
      Math.ceil(props.duration / 2) * 360
    );
    setUsers(shuffled);
    setTimeout(() => setScrollSize(scroll), 10);
    setWinner(shuffled[winnerIndex]);
    const sId1 = tickSound.play('start');
    tickSound.on(
      'end',
      () => {
        tickSound.play('tick');
        tickSound.loop(true);
      },
      sId1,
    );
    setTimeout(() => {
      tickSound.stop();
      tickSound.unload();
    }, props.duration * 1000);
    setTimer(
      setTimeout(() => {
        props.onWin(shuffled[winnerIndex].id);
      }, (props.duration + 1) * 1000),
    );
  }, []);

  const positions = [
    { x: '43%', y: '8%' },
    { x: '63%', y: '15%' },
    { x: '75%', y: '32%' },
    { x: '76%', y: '52%' },
    { x: '63%', y: '70%' },
    { x: '43%', y: '77%' },
    { x: '23%', y: '70%' },
    { x: '10%', y: '53%' },
    { x: '10%', y: '32%' },
    { x: '22%', y: '14%' },
  ];

  const wheelItems = [];
  if (users[0] !== undefined) {
    for (let i = 0; i < 10; i += 1) {
      wheelItems.push(
        <WheelItem
          key={i}
          style={{
            left: positions[i].x,
            top: positions[i].y,
            transform: `rotate(${i * 36}deg)`,
          }}
        >
          <img src={users[i].imageUrl} alt={users[i].title} />
          <span>{users[i].title}</span>
        </WheelItem>,
      );
    }
  }
  return (
    <DialogRoot>
      <button
        aria-label="stop the wheel immediately"
        className="dialog-backdrop"
        onClick={closeImmediately}
        type="button"
      />
      <RaffleDialog>
        <WheelMovable
          style={{
            position: 'absolute',
            transform: `rotate(${scrollSize}deg)`,
            transitionDuration: `${props.duration}s`,
          }}
        >
          <WheelImg src={FortuneWheelImg} />
          {wheelItems}
        </WheelMovable>
        <WheelBorder src={FortuneWheelBorder} />
        <RaffleWinner style={{ animationDelay: `${props.duration + 0.1}s` }}>
          {winner !== null && winner.title}
        </RaffleWinner>
      </RaffleDialog>
    </DialogRoot>
  );
};

FortuneWheelRaffle.propTypes = {
  duration: PropTypes.number,
  giveawayReq: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onWin: PropTypes.func.isRequired,
  userArray: PropTypes.array,
};
FortuneWheelRaffle.defaultProps = {
  duration: 7,
};

const mapStateToProps = createStructuredSelector({
  giveawayReq: makeSelectGiveawayRequirement(),
  userArray: makeSelectUserArray(),
});

export default connect(mapStateToProps, null)(FortuneWheelRaffle);
