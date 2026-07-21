import { useEffect, useState, useRef, memo } from 'react';
import styled from 'styled-components';
import {
  makeSelectGiveawayPreWinner,
  makeSelectGiveawayRequirement,
} from '../GiveawayRules/selectors';
import { makeSelectUserArray } from '../UserList/selectors';
import slotMachineImg from './assets/SlotsMachineOuter.svg';
import lever from './assets/lever1.svg';
import lemon from './assets/symbols/lemon.svg';
import bell from './assets/symbols/bell.svg';
import cherry from './assets/symbols/cherry.svg';
import clover from './assets/symbols/clover.svg';
import diamond from './assets/symbols/diamond.svg';
import seven from './assets/symbols/seven.svg';
import treasure from './assets/symbols/treasure.svg';
import WheelItem from './WheelItem';
import './rolling.css';
import './leverpull.css'

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
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
const Leverimg = styled.img`
  width: 40%;
  height: 40%;
  position: absolute;
  top: 58%;
  left: 30%;
  z-index: 5;
`;

const SlotsRaffle = (props) => {
  const [isPulled, setIsPulled] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [users, setUsers] = useState([]);
  const [winner, setWinner] = useState([]); 
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
    for (let i = 0; i < 30 + props.duration * 3; i += 1) {
      shuffled.push(
        eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)]
      );
    }
    const winnerIndex =
      Math.floor(Math.random() * 10) + 10 + props.duration * 3;
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
  }, []);

 const generateLongList = () => 
    Array.from({ length: 31 }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      src: imageFiles[Math.floor(Math.random() * imageFiles.length)]
    }));
 const generateUserList = () =>
      Array.from({ length: 31 }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      src: users[Math.floor(Math.random() * users.length)]
    }));
    const [reels, setReels] = useState([
    { setA: generateLongList(), setB: generateLongList() }, 
    { setA: generateUserList(), setB: generateUserList() }, 
    { setA: generateLongList(), setB: generateLongList() }  
  ]);
  const closeImmediately = () => {
    props.onClose();
  };
const startSlotMachine = () => {
  setIsRolling(true);

  setTimeout(() => {
    const newResults = [
        { setA: generateLongList(), setB: generateLongList() },
        { setA: generateUserList(), setB: generateUserList() }, 
        { setA: generateLongList(), setB: generateLongList() }
    ];
    setReels(newResults);
    setIsRolling(false); 
  }, 10000);
};
const SlotSymbol = memo(({ src }) => (
  <img src={src} style={{ width: '100%', height: '150px', display: 'block' }} />
));
  const handleLeverClick = () => {
  if (isPulled || isRolling) return; 

  setIsPulled(true);
  setIsRolling(true);
  
  startSlotMachine(); 
  
  setTimeout(() => setIsPulled(false), 500);
};
  const positions = [
    { x: '15%', y: '30%' },
    { x: '44%', y: '30%' },
    { x: '73%', y: '30%' },
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
        const newSet = generateLongList();
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
}, []);

  return (
    <div className="dialog-root">
      <button
        aria-label="stop the raffle immediately"
        className="dialog-backdrop"
        onClick={closeImmediately}
        type="button"
      />
    <Container>
      <SlotMachineImg src={slotMachineImg} />
      <Leverimg 
        src={lever} 
        className={`lever ${isPulled ? 'lever-pulled' : ''}`}
        onClick={handleLeverClick}
        alt="Dźwignia"
      />
      {positions.map((pos, reelIndex) => (
        <WheelItem 
          key={reelIndex}        
          style={{ position: 'absolute', left: pos.x, top: pos.y, zIndex: 2, overflow: 'hidden', height: '150px', width: '80px' }}
        >
 <div 
  className={`symbol-container ${isRolling ? 'is-rolling' : ''}`}
  ref={(el) => (containerRefs.current[reelIndex] = el)}
>
            <div className="set-wrapper set-a">
              {reels[reelIndex].setA.map((item) => (
                <SlotSymbol key={item.id} src={item.src} />
              ))}
            </div>
            <div className="set-wrapper set-b">
              {reels[reelIndex].setB.map((item) => (
                <SlotSymbol key={item.id} src={item.src} />
              ))}
            </div>
          </div>
        </WheelItem>
      ))}
    </Container>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  giveawayReq: makeSelectGiveawayRequirement(),
  preWinner: makeSelectGiveawayPreWinner(),
  userArray: makeSelectUserArray(),
});
export default connect(mapStateToProps, mapDispatchToProps)(SlotsRaffle);