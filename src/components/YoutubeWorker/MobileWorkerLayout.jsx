import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { FormattedMessage } from 'react-intl';

import ChatView from '../ChatView';
import GiveawayRules from '../GiveawayRules';
import UserList from '../UserList';
import chatMessages from '../ChatView/messages';
import userListMessages from '../UserList/messages';

const Sections = styled.div`
  background-color: ${(props) => props.theme.bodyBackground};
  display: flex;
  flex-direction: column;
  min-height: 95vh;
`;

const RaffleSlot = styled.div`
  display: flex;
  flex: 1 1 auto;
  > div {
    flex: 1;
    height: auto;
    margin: 5px;
    min-height: 0;
  }
`;

const StyledAccordion = styled(Accordion)`
  background-color: ${(props) => props.theme.panelBackground};
  background-image: none;
  color: ${(props) => props.theme.staticTextColor};
  margin: 0;
  &::before {
    display: none;
  }
`;

const SummaryTitle = styled.span`
  color: ${(props) => props.theme.staticTextColor};
  font-size: 1.1rem;
  font-weight: bold;
`;

const ThemedSvg = styled.svg`
  color: ${(props) => props.theme.staticTextColor};
  fill: currentColor;
`;

const PanelSlot = styled(AccordionDetails)`
  height: 60vh;
  padding: 0;
  > div {
    height: 100%;
    margin: 0;
    min-height: 0;
  }
`;

const ExpandIcon = () => (
  <ThemedSvg viewBox="0 0 24 24" width="24px" height="24px">
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </ThemedSvg>
);

const MobileWorkerLayout = (props) => {
  const [expanded, setExpanded] = useState(null);

  const toggleSection = (section) => (_event, isExpanded) => {
    setExpanded(isExpanded ? section : null);
  };

  return (
    <Sections>
      <RaffleSlot>
        <GiveawayRules apiKey={props.apiKey} />
      </RaffleSlot>
      <StyledAccordion
        expanded={expanded === 'users'}
        onChange={toggleSection('users')}
      >
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <SummaryTitle>
            <FormattedMessage {...userListMessages.panelTitle} />
          </SummaryTitle>
        </AccordionSummary>
        <PanelSlot>
          <UserList platform={props.platform} />
        </PanelSlot>
      </StyledAccordion>
      <StyledAccordion
        expanded={expanded === 'chat'}
        onChange={toggleSection('chat')}
      >
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <SummaryTitle>
            <FormattedMessage {...chatMessages.panelTitle} />
          </SummaryTitle>
        </AccordionSummary>
        <PanelSlot>
          <ChatView channel={props.channel} platform={props.platform} />
        </PanelSlot>
      </StyledAccordion>
    </Sections>
  );
};

MobileWorkerLayout.propTypes = {
  apiKey: PropTypes.string.isRequired,
  channel: PropTypes.string,
  platform: PropTypes.string,
};

export default MobileWorkerLayout;
