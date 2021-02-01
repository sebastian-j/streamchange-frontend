import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FormattedMessage } from 'react-intl';

import LightBulbImg from './light-bulb.png';
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
  background-color: white;
  display: flex;
  flex-direction: row;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-top: 20px;
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
  margin: 10px;
`;

const Button = styled.button`
  background: none;
  border: none;
  outline: none;
`;

const Image = styled.img`
  height: 140px;
`;

const WelcomeHint = () => {
  const [hint, setHint] = useState('');

  useEffect(() => {
    setHint(HINTS[Math.floor(Math.random() * HINTS.length)]);
  }, []);

  const changeHint = () => {
    setHint(HINTS[Math.floor(Math.random() * HINTS.length)]);
  };

  return (
    <Wrapper>
      <Button onClick={changeHint}>
        <Image src={LightBulbImg} alt="light bulb" />
      </Button>
      <div>
        <DialogTitle>
          <FormattedMessage {...messages.hintTitle} />
        </DialogTitle>
        <DialogContent>{hint}</DialogContent>
      </div>
    </Wrapper>
  );
};

export default WelcomeHint;
