import { useEffect, useState, useRef, memo, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSound, setSoundEnabled } from 'react-sounds';
import InternalChatBadges from '../ChatView/InternalChatBadges';
import slotMachineImg from './assets/SlotsMachineOuter.svg';
import lever from './assets/lever1.svg';
import speakerOn from './assets/SpeakerOn.svg';
import speakerOff from './assets/SpeakerOff.svg';
import lemon from './assets/symbols/lemon.svg';
import bell from './assets/symbols/bell.svg';
import cherry from './assets/symbols/cherry.svg';
import clover from './assets/symbols/clover.svg';
import diamond from './assets/symbols/diamond.svg';
import seven from './assets/symbols/seven.svg';
import treasure from './assets/symbols/treasure.svg';
import './winAnimation.css';
import WheelItem from './WheelItem.tsx';
import SymbolContainer from './rolling.tsx';
import './leverpull.css';

const imageFiles = [lemon, bell, cherry, clover, treasure, diamond, seven];
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
const Speaker = styled.img`
  width: 7%;
  height: 7%;
  position: absolute;
  top: 95.5%;
  left: 93.5%;
  z-index: 10;
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
        style={{
          width: '18vw',
          height: '13vh',
          display: 'flex',
          objectFit: 'contain',
          margin: '1vh',
        }}
      />
    );
  }

  const u = item.user;
  if (!u) return <div style={{ width: '18vw', height: '14vh' }} />;

  const hasBadges = u.badges && Object.keys(u.badges).length > 0;

  return (
    <div className="vroller-cell">
      {hasBadges && (
        <span className="vroller-badge">
          <span className="vroller-badge-inner">
            <InternalChatBadges message={u} />
          </span>
        </span>
      )}
      <span
        className="vroller-nickname"
        style={
          u.color
            ? {
                color: u.color,
              }
            : {
                color: '#0f0e0e',
              }
        }
      >
        {u.title}
      </span>
    </div>
  );
});

SlotSymbol.displayName = 'SlotSymbol';

const SlotsRaffleComponent = (props) => {
  const [isPulled, setIsPulled] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [winnerShow, setWinnerShow] = useState(false);
  const [winner, setWinner] = useState(null);
  const [soundOn, setSoundOn] = useState(true);

  const timerRef = useRef(null);
  const winIntervalRef = useRef(null);
  const winTimeoutRef = useRef(null);

  const { play: playToggleOff } = useSound('ui/toggle_off');
  const { play: playToggleOn } = useSound('ui/toggle_on');
  const { play: levelUpPlay, stop: levelUpStop } = useSound('arcade/level_up', {
    rate: 4.0,
    volume: 0.75,
  });

  const soundOnRef = useRef(soundOn);
  const levelUpPlayRef = useRef(levelUpPlay);
  const levelUpStopRef = useRef(levelUpStop);

  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  useEffect(() => {
    levelUpPlayRef.current = levelUpPlay;
    levelUpStopRef.current = levelUpStop;
  }, [levelUpPlay, levelUpStop]);

  useEffect(() => {
    setSoundEnabled(true);
  }, []);

  const turnSpeakerOff = () => {
    setSoundEnabled(false);
    setSoundOn(false);
    levelUpStopRef.current?.();
  };

  const turnSpeakerOn = () => {
    setSoundEnabled(true);
    setSoundOn(true);
  };

  const eligibleUsers = useMemo(() => {
    let users = (props.userArray || []).filter(
      (user) => user.isEligible === true
    );
    if (props.giveawayReq === 1) {
      users = users.filter((user) => user.isSubscriber !== false);
    }
    return users;
  }, [props.userArray, props.giveawayReq]);

  const generateLongList = useCallback(
    (prefix = 'fruit') =>
      Array.from({ length: 31 }, (_, index) => ({
        id: `${prefix}-slot-${index}`,
        type: 'fruit',
        src: imageFiles[Math.floor(Math.random() * imageFiles.length)],
      })),
    []
  );

  const generateUserList = useCallback(
    (prefix = 'user') => {
      const sourceUsers = eligibleUsers;
      return Array.from({ length: 31 }, (_, index) => {
        const randomUser =
          sourceUsers.length > 0
            ? sourceUsers[Math.floor(Math.random() * sourceUsers.length)]
            : null;
        return {
          id: `${prefix}-slot-${index}`,
          type: 'user',
          user: randomUser,
        };
      });
    },
    [eligibleUsers]
  );

  const generateFixedUserList = (winningUser) => {
    const winningIndex = 61;
    const sourceUsers =
      eligibleUsers.length > 0 ? eligibleUsers : props.userArray || [];
    return Array.from({ length: 62 }, (_, index) => {
      if (index === winningIndex) {
        return {
          id: `win-${winningUser.id || index}`,
          type: 'user',
          user: winningUser,
        };
      }
      const randomUser =
        sourceUsers.length > 0
          ? sourceUsers[Math.floor(Math.random() * sourceUsers.length)]
          : null;
      return {
        id: Math.random().toString(36).substring(2, 9),
        type: 'user',
        user: randomUser,
      };
    });
  };

  const generateWinningFruitList = (prefix = 'win-fruit') => {
    const winningIndex = 61;
    return Array.from({ length: 62 }, (_, index) => {
      if (index === winningIndex) {
        return {
          id: `${prefix}-win-seven-${index}`,
          type: 'fruit',
          src: seven,
        };
      }
      return {
        id: `${prefix}-slot-${index}`,
        type: 'fruit',
        src: imageFiles[Math.floor(Math.random() * imageFiles.length)],
      };
    });
  };

  const [reels, setReels] = useState(() => {
    const list0A = generateLongList();
    const list1A = generateUserList();
    const list2A = generateLongList();

    return [
      { setA: list0A, setB: generateLongList(), setA2: list0A },
      { setA: list1A, setB: generateUserList(), setA2: list1A },
      { setA: list2A, setB: generateLongList(), setA2: list2A },
    ];
  });

  const stopAllTimersAndSounds = useCallback(() => {
    if (winIntervalRef.current) {
      clearInterval(winIntervalRef.current);
      winIntervalRef.current = null;
    }
    if (winTimeoutRef.current) {
      clearTimeout(winTimeoutRef.current);
      winTimeoutRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (levelUpStopRef.current) {
      levelUpStopRef.current();
    }
  }, []);

  const closeImmediately = useCallback(() => {
    stopAllTimersAndSounds();
    setSoundEnabled(false);
    props.onClose();
  }, [stopAllTimersAndSounds, props]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeImmediately();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      stopAllTimersAndSounds();
    };
  }, [closeImmediately, stopAllTimersAndSounds]);

  const winnerView = () => {
    setWinnerShow(true);
  };

  const startSlotMachine = () => {
    const sourceUsers = eligibleUsers;
    if (sourceUsers.length === 0) return;
    stopAllTimersAndSounds();

    const selectedWinner =
      props.preWinner ||
      sourceUsers[Math.floor(Math.random() * sourceUsers.length)];
    setWinner(selectedWinner);

    const fixedUserList = generateFixedUserList(selectedWinner);
    const fixedFruitListLeft = generateWinningFruitList();
    const fixedFruitListRight = generateWinningFruitList();

    setReels([
      {
        setA: fixedFruitListLeft,
        setB: fixedFruitListLeft,
        setA2: fixedFruitListLeft,
      },
      { setA: fixedUserList, setB: fixedUserList, setA2: fixedUserList },
      {
        setA: fixedFruitListRight,
        setB: fixedFruitListRight,
        setA2: fixedFruitListRight,
      },
    ]);

    setIsRolling(true);
    const spinDuration = 10000;

    winTimeoutRef.current = setTimeout(() => {
      winnerView();
      winIntervalRef.current = setInterval(() => {
        if (soundOnRef.current) {
          levelUpPlayRef.current?.();
        }
      }, 100);

      setTimeout(() => {
        if (winIntervalRef.current) {
          clearInterval(winIntervalRef.current);
          winIntervalRef.current = null;
        }
      }, 5000);
    }, spinDuration);

    timerRef.current = setTimeout(() => {
      setWinnerShow(false);
      if (selectedWinner && selectedWinner.id) {
        props.onWin(selectedWinner.id);
      }

      const new0A = generateLongList();
      const new1A = generateUserList();
      const new2A = generateLongList();

      setReels([
        { setA: new0A, setB: generateLongList(), setA2: new0A },
        { setA: new1A, setB: generateUserList(), setA2: new1A },
        { setA: new2A, setB: generateLongList(), setA2: new2A },
      ]);
      setIsRolling(false);
    }, spinDuration + 5000);
  };

  const handleLeverClick = () => {
    const sourceUsers =
      eligibleUsers.length > 0 ? eligibleUsers : props.userArray || [];
    if (isPulled || isRolling || sourceUsers.length === 0) return;

    setIsPulled(true);
    startSlotMachine();

    setTimeout(() => setIsPulled(false), 500);
  };

  const positions = [
    { x: '-5.75vw', y: '15vh' },
    { x: '9.6vw', y: '15vh' },
    { x: '20.75vw', y: '15vh' },
  ];

  const containerRefs = useRef([]);

  useEffect(() => {
    if (isRolling) return;

    const container = containerRefs.current[0];
    if (!container) return;

    const durationSeconds =
      parseFloat(window.getComputedStyle(container).animationDuration) || 2;
    const intervalTime = (durationSeconds * 1000) / 2;

    const interval = setInterval(() => {
      setReels((prev) => {
        const next = [...prev];

        containerRefs.current.forEach((el, reelIndex) => {
          if (!el) return;

          const style = window.getComputedStyle(el);
          const matrix = new DOMMatrix(style.transform);
          const translateY = matrix.m42;
          const translateHeightPx = (window.innerHeight * 208) / 100;
          if (translateY < -translateHeightPx) {
            const newSetA =
              reelIndex === 1 ? generateUserList() : generateLongList();
            next[reelIndex] = {
              ...next[reelIndex],
              setA: newSetA,
              setA2: newSetA,
            };
          } else {
            next[reelIndex] = {
              ...next[reelIndex],
              setB: reelIndex === 1 ? generateUserList() : generateLongList(),
            };
          }
        });
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isRolling, generateLongList, generateUserList]);

  useEffect(() => {
    let animationFrameId;
    const container = containerRefs.current[0];

    if (!container) return;

    const initialStyle = window.getComputedStyle(container);
    const initialMatrix = new DOMMatrix(initialStyle.transform);
    const itemHeightPx = (window.innerHeight * 14) / 100;
    let lastTickIndex = Math.floor(Math.abs(initialMatrix.m42) / itemHeightPx);

    const trackRollingSound = () => {
      if (!containerRefs.current[0]) return;

      const style = window.getComputedStyle(containerRefs.current[0]);
      const matrix = new DOMMatrix(style.transform);
      const translateY = Math.abs(matrix.m42);
      const currentTickIndex = Math.floor(translateY / itemHeightPx);

      if (currentTickIndex !== lastTickIndex) {
        if (soundOnRef.current) {
          if (isRolling) {
            if (currentTickIndex % 2 === 0) {
              if (playToggleOn) playToggleOff();
            } else {
              if (playToggleOff) playToggleOn();
            }
          } else {
            if (playToggleOff) playToggleOff();
          }
        }

        lastTickIndex = currentTickIndex;
      }

      animationFrameId = requestAnimationFrame(trackRollingSound);
    };

    animationFrameId = requestAnimationFrame(trackRollingSound);

    return () => cancelAnimationFrame(animationFrameId);
  }, [playToggleOff, playToggleOn, isRolling]);

  return (
    <div className="dialog-root" role="dialog">
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
        />
        <Leverimg
          src={lever}
          className={`lever ${isPulled ? 'lever-pulled' : ''}`}
          onClick={handleLeverClick}
        />
        {soundOn ? (
          <Speaker src={speakerOn} onClick={turnSpeakerOff} />
        ) : (
          <Speaker src={speakerOff} onClick={turnSpeakerOn} />
        )}
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
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              zIndex: 2,
              overflow: 'hidden',
              height: '25vh',
              width: '18vw',
            }}
          >
            <SymbolContainer
              className={isRolling ? 'is-rolling' : ''}
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
              <div className="set-wrapper set-a2">
                {reels[reelIndex].setA2.map((item) => (
                  <SlotSymbol key={`a2-${item.id}`} item={item} />
                ))}
              </div>
            </SymbolContainer>
          </WheelItem>
        ))}
      </Container>
      <span className="raffle-winner" style={{ animationDelay: `5s` }}>
        {winner?.title}
      </span>
    </div>
  );
};

SlotsRaffleComponent.propTypes = {
  giveawayReq: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onWin: PropTypes.func.isRequired,
  preWinner: PropTypes.object,
  userArray: PropTypes.array,
};

const areEqual = (prevProps, nextProps) =>
  prevProps.onClose === nextProps.onClose &&
  prevProps.onWin === nextProps.onWin;

export default memo(SlotsRaffleComponent, areEqual);
