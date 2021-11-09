import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FormattedMessage } from 'react-intl';

import CannabisImg from '../../images/WelcomeHint/cannabis.webp';
import ChristmasImg from '../../images/WelcomeHint/christmas.webp';
import DogImg from '../../images/WelcomeHint/dog.webp';
import FallImg from '../../images/WelcomeHint/fall.webp';
import FireworksImg from '../../images/WelcomeHint/fireworks.webp';
import HalloweenImg from '../../images/WelcomeHint/halloween.webp';
import LightBulbImg from '../../images/WelcomeHint/light-bulb.webp';
import PiImg from '../../images/WelcomeHint/pi.webp';
import RainbowFlagImg from '../../images/WelcomeHint/rainbow-flag.webp';
import SantaClausImg from '../../images/WelcomeHint/santa claus.webp';
import ValentineImg from '../../images/WelcomeHint/valentine.webp';
import VeganImg from '../../images/WelcomeHint/vegan.webp';
import messages from './messages';
import { HINTS } from '../../config';

const SlideUp = keyframes`
  0% {
    transform: translateY(550px) translateX(100px);
  }
  20% {
    transform: translateY(550px) translateX(100px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const Wrapper = styled.div`
  animation: ${SlideUp} 0.7s ease-out;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  margin-top: 20px;
`;

const HintPanel = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  max-width: 600px;
`;

const DialogTitle = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  display: block;
  margin: 10px;
`;

const DialogContent = styled.span`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  display: block;
  line-height: 1.1;
  margin: 10px;
`;

const HolidayPanel = styled.div`
  background-color: wheat;
  border-radius: 0 0 4px 4px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  margin-top: -2px;
  padding: 6px;
  width: 100%;
`;

const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  @media (orientation: portrait) {
    margin: 0 -20px 0 -10px;
  }
`;

const Image = styled.img`
  height: 140px;
`;

const WelcomeHint = () => {
  const [hint, setHint] = useState('');
  const [image, setImage] = useState(LightBulbImg);
  const [holiday, setHoliday] = useState(null);

  const holidaysDates = [
    [/14-02/, ValentineImg, 'holiday1402'],
    [/14-03/, PiImg, 'holiday1403'],
    [/20-04/, CannabisImg, 'holiday2004'],
    [/17-05/, RainbowFlagImg, 'holiday1705'],
    [/\d-06/, RainbowFlagImg, 'holidayJune'],
    [/26-08/, DogImg, 'holiday2608'],
    [/23-09/, FallImg, 'holiday2309'],
    [/01-10/, VeganImg, 'holiday0110'],
    [/11-10/, RainbowFlagImg, 'holiday1110'],
    [/31-10/, HalloweenImg, 'holiday3110'],
    [/06-12/, SantaClausImg, 'holiday0612'],
    [/(?:25|26)-12/, ChristmasImg, 'holiday2512'],
    [/31-12/, FireworksImg, 'holiday3112'],
  ];

  useEffect(() => {
    setHint(HINTS[Math.floor(Math.random() * HINTS.length)]);
    for (let i = 0; i < holidaysDates.length; i += 1) {
      if (holidaysDates[i][0].test(getToday())) {
        setImage(holidaysDates[i][1]);
        setHoliday(holidaysDates[i][2]);
        break;
      }
    }
  }, []);

  const changeHint = () => {
    setHint(HINTS[Math.floor(Math.random() * HINTS.length)]);
  };

  const getToday = () => {
    const d = new Date();
    let day = `${d.getDate()}`;
    let month = `${d.getMonth() + 1}`;

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [day, month].join('-');
  };

  return (
    <Wrapper>
      <HintPanel>
        <Button onClick={changeHint}>
          <Image src={image} alt="light bulb" />
        </Button>
        <div>
          <DialogTitle>
            <FormattedMessage {...messages.hintTitle} />
          </DialogTitle>
          <DialogContent>{hint}</DialogContent>
        </div>
      </HintPanel>
      {holiday && (
        <HolidayPanel>
          <FormattedMessage {...messages[holiday]} />
        </HolidayPanel>
      )}
    </Wrapper>
  );
};

export default WelcomeHint;
