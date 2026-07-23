import { useEffect, useState, useRef, memo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectGiveawayPreWinner,
  makeSelectGiveawayRequirement,
} from '../GiveawayRules/selectors';
import { makeSelectUserArray } from '../UserList/selectors';
import InternalChatBadges from '../ChatView/InternalChatBadges';
import slotMachineImg from './assets/SlotsMachineOuter.svg';
import lever from './assets/lever1.svg';
import lemon from './assets/symbols/lemon.svg';
import bell from './assets/symbols/bell.svg';
import cherry from './assets/symbols/cherry.svg';
import clover from './assets/symbols/clover.svg';
import diamond from './assets/symbols/diamond.svg';
import seven from './assets/symbols/seven.svg';
import treasure from './assets/symbols/treasure.svg';
import './winAnimation.css';
import WheelItem from './WheelItem.tsx';
import './rolling.css';
import './leverpull.css'
import './style.css'

const Container = styled.div`
  position: absolute;
  width: 75vh;
  height: 75vh;
  inset-inline-start: 50%;
  inset-block-start: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1;
`;
const SlotMachineImg = styled.img`
  width: 125%;
  height: 125%;
  position: absolute;
  top: -15%;
  left: -15%;
  z-index: 1;
`;
const Leverimg = styled.img`
  width: 40%;
  height: 50%;
  position: absolute;
  top: 58%;
  left: 30%;
  z-index: 5;
`;

const SlotSymbol = memo(({ item }) => {
  if (item.type === 'fruit') {
    return (
      <img
        src={item.src}
        alt="symbol"
        style={{ width: '50%', height: '150px', display: 'flex', objectFit: 'contain',margin:'0 auto' }}
      />
    );
  }

  const u = item.user;
  if (!u) return <div style={{ width: '100%', height: '150px' }} />;

  return (
    <div
      className="vroller-cell"
      style={{
        width: '100%',
        height: '150px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        overflow: 'hidden',
        padding: '0 5px'
      }}
    >
      <span className="vroller-badge">
        <span className="vroller-badge-inner">
          <InternalChatBadges message={u} />
        </span>
      </span>
      <span
        className="vroller-nickname"
        style={
          u.color
            ? { color: u.color, fontWeight: 'bold', fontSize: '24px', textAlign: 'center', wordBreak: 'break-word' }
            : { color: '#0f0e0e', fontWeight: 'bold', fontSize: '24px', textAlign: 'center', wordBreak: 'break-word' }
        }
      >
        {u.title}
      </span>
    </div>
  );
});

const SlotsRaffle = (props) => {
  const [isPulled, setIsPulled] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [winnerShow, setWinnerShow] = useState(false);
  const [timer,setTimer] =useState(null);
  const [users, setUsers] = useState([]);
  const [winner, setWinner] = useState(null);
 const imageFiles = [lemon, bell, cherry, clover, treasure, diamond, seven];

 useEffect(() => {
    let eligibleUsers = props.userArray.filter(
      (user) => user.isEligible === true
    );
    if (props.giveawayReq === 1) {
      eligibleUsers = eligibleUsers.filter(
        (user) => user.isSubscriber !== false
      );
    }
    const shuffled = [];
    for (let i = 0; i < 31; i += 1) {
      shuffled.push(
        eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)]
      );
    }
    const winnerIndex =
      Math.floor(Math.random() * 10) + 10;
    if (props.preWinner) shuffled[winnerIndex] = props.preWinner;
    setUsers(shuffled);
    setWinner(shuffled[winnerIndex]);
    setTimer(
      setTimeout(
        () => {
          props.onWin(shuffled[winnerIndex].id);
        },
        (props.duration + 1) * 1000
      )
    );
    console.log(shuffled);
    console.log(winnerIndex);
  }, [props.userArray],[]);

 const generateLongList = () =>
    Array.from({ length: 31 }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      type: 'fruit',
      src: imageFiles[Math.floor(Math.random() * imageFiles.length)]
    }));

 const generateUserList = () =>
    Array.from({ length: 31 }, () => {
      const randomUser = users.length > 0 ? users[Math.floor(Math.random() * users.length)] : null;
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: 'user',
        user: randomUser
      };
    });

    const [reels, setReels] = useState([
    { setA: generateLongList(), setB: generateLongList() }, 
    { setA: generateUserList(), setB: generateUserList() }, 
    { setA: generateLongList(), setB: generateLongList() }  
  ]);

  useEffect(() => {
    if (users.length === 0) return;
    setReels((prev) => [
      prev[0],
      { setA: generateUserList(), setB: generateUserList() },
      prev[2]
    ]);
  }, [users]);

  const closeImmediately = () => {
    props.onClose();
    clearTimeout(timer);
  };
const startSlotMachine = () => {
  setIsRolling(true);
  const spinDuration = 10000;

  setTimeout(() => {
      winnerView();
  }, spinDuration);
      setTimeout(() => {
      setWinnerShow(false);
          const newResults = [
        { setA: generateLongList(), setB: generateLongList() },
        { setA: generateUserList(winner, 15), setB: generateUserList() }, 
        { setA: generateLongList(), setB: generateLongList() }
    ];
    setReels(newResults);
      setIsRolling(false);
    }, 15000);

};

  const handleLeverClick = () => {
  if (isPulled || isRolling) return; 

  setIsPulled(true);
  setIsRolling(true);
  
  startSlotMachine(); 
  
  setTimeout(() => setIsPulled(false), 500);
};
const winnerView = () => {
    setWinnerShow(true);
    setTimeout(() => setWinnerShow(false), 5000);
  };
  const positions = [
    { x: '-5%', y: '18%' },
    { x: '30%', y: '18%' },
    { x: '67%', y: '18%' },
  ];


  const containerRefs = useRef([]);

  useEffect(() => {
  const container = containerRefs.current[0];
  if (!container) return;

  const durationSeconds = parseFloat(window.getComputedStyle(container).animationDuration);
  const intervalTime = (durationSeconds * 1000) / 2;

  const interval = setInterval(() => {
    setReels(prev => {
      const next = [...prev];
      
      containerRefs.current.forEach((el, reelIndex) => {
        if (!el) return;
        
        const style = window.getComputedStyle(el);
        const matrix = new DOMMatrix(style.transform);
        const translateY = matrix.m42; 
        const newSet = reelIndex === 1 ? generateUserList() : generateLongList();
        if (translateY < -2250) {
          next[reelIndex] = { ...next[reelIndex], setA: newSet };
        } else {
          next[reelIndex] = { ...next[reelIndex], setB: newSet };
        }
      });
      return next;
    });
  }, intervalTime);

  return () => clearInterval(interval);
}, [users]);

  return (
    <div className="dialog-root">
      <button
        aria-label="stop the raffle immediately"
        className="dialog-backdrop"
        onClick={closeImmediately}
        type="button"
      />
    <Container>
      <SlotMachineImg 
          src={slotMachineImg} 
          className={`SlotMachineimg ${winnerShow ? 'winnerShow' : ''}`}
          onAnimationEnd={() => setWinnerShow(false)} 
          alt="maszyna"
        />
      <Leverimg 
        src={lever} 
        className={`lever ${isPulled ? 'lever-pulled' : ''}`}
        onClick={handleLeverClick}
        alt="Dźwignia"
      />
      {winnerShow && (
      <div className="stars-container">
      <div className="star-particle" />
      <div className="star-particle" />
      <div className="star-particle" />
      <div className="star-particle" />
      <div className="star-particle" />
      <div className="star-particle" />
      <div className="star-particle" />
      </div>
       )}
        {winnerShow && (
      <div className="coin-container">
      <div className="coin-particle" />
      <div className="coin-particle" />
      <div className="coin-particle" />
      <div className="coin-particle" />
      <div className="coin-particle" />
      <div className="coin-particle" />
      <div className="coin-particle" />
      </div>
      )}
      {positions.map((pos, reelIndex) => (
        <WheelItem 
          key={reelIndex}        
          style={{ position: 'absolute', left: pos.x, top: pos.y, zIndex: 2, overflow: 'hidden', height: '250px', width: '250px' }}
        >
 <div 
  className={`symbol-container ${isRolling ? 'is-rolling' : ''}`}
  ref={(el) => (containerRefs.current[reelIndex] = el)}
>
            <div className="set-wrapper set-a">
              {reels[reelIndex].setA.map((item) => (
                <SlotSymbol key={item.id} item={item} />
              ))}
            </div>
            <div className="set-wrapper set-b">
              {reels[reelIndex].setB.map((item) => (
                <SlotSymbol key={item.id} item={item} />
              ))}
            </div>
          </div>
        </WheelItem>
      ))}
    </Container>
          <span
          className="raffle-winner"
          style={{ animationDelay: `5s` }}
        >
          {winner?.title}
        </span>
    </div>
  );
};

SlotsRaffle.propTypes = {
  duration: PropTypes.number,
  giveawayReq: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onWin: PropTypes.func.isRequired,
  preWinner: PropTypes.object,
  userArray: PropTypes.array,
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

export default connect(mapStateToProps)(memo(SlotsRaffle, areEqual));
