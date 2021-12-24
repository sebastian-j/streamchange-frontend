import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import CannabisImg from '../assets/cannabis.webp';
import ChristmasImg from '../assets/christmas.webp';
import DogImg from '../assets/dog.webp';
import FallImg from '../assets/fall.webp';
import FireworksImg from '../assets/fireworks.webp';
import HalloweenImg from '../assets/halloween.webp';
import LightBulbImg from '../assets/light-bulb.webp';
import PiImg from '../assets/pi.webp';
import RainbowFlagImg from '../assets/rainbow-flag.webp';
import SantaClausImg from '../assets/santa claus.webp';
import ValentineImg from '../assets/valentine.webp';
import VeganImg from '../assets/vegan.webp';
import { DialogContent } from './components/DialogContent';
import { DialogTitle } from './components/DialogTitle';
import { HintPanel } from './components/HintPanel';
import { HolidayPanel } from './components/HolidayPanel';
import { ImageButton } from './components/ImageButton';
import { Wrapper } from './components/Wrapper';
import messages from './messages';
import { HINTS } from '../../../config';

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

  const getToday = () => {
    const d = new Date();
    let day = `${d.getDate()}`;
    let month = `${d.getMonth() + 1}`;

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [day, month].join('-');
  };

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

  return (
    <Wrapper>
      <HintPanel>
        <ImageButton onClick={changeHint}>
          <img src={image} alt="light bulb" />
        </ImageButton>
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
