import React, { useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import CookieImage from './cookies.webp';

const Wrapper = styled.div`
  align-items: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.32);
  bottom: 30px;
  display: flex;
  flex-direction: row;
  right: 30px;
  height: 10vh;
  position: fixed;
  transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: auto;
`;

const Image = styled.img`
  margin: 1% 10px 1% 10px;
  height: 90%;
`;

const Description = styled.span`
  max-width: 30vw;
`;
const AcceptButton = styled.button`
  background: white;
  border: 2px solid #0084b5;
  border-radius: 4px;
  color: #0084b5;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1em;
  padding: 0.3em 0.4em;
  margin: 15px;
  :hover {
    background-color: #0084b5;
    color: white;
  }
`;

const CookieConsent = () => {
  const [accepted, setAccepted] = useState(
    localStorage.getItem('cookieConsent') === 'true',
  );
  const handleAcceptClick = () => {
    localStorage.setItem('cookieConsent', 'true');
    setAccepted(true);
  };
  if (accepted) {
    return <div />;
  }
  return (
    <Wrapper>
      <Image src={CookieImage} alt="cookie" />
      <Description>
        <FormattedMessage {...messages.cookieInfo} />
      </Description>
      <AcceptButton onClick={handleAcceptClick} type="button">
        <FormattedMessage {...messages.cookieAcceptButton} />
      </AcceptButton>
    </Wrapper>
  );
};

export default CookieConsent;
