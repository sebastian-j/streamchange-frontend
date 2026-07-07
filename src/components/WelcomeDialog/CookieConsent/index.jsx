import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { AcceptButton } from './components/AcceptButton';
import CookieImage from '../assets/cookies.webp';
import { Description } from './components/Description';
import { Image } from './components/Image';
import { Wrapper } from './components/Wrapper';
import messages from './messages';

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
