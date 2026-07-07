import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, useIntl } from 'react-intl';

import Tooltip from '@mui/material/Tooltip';
import messages from './messages';
import {
  makeSelectCapacity,
  makeSelectQueueCommand,
  makeSelectTTI,
  makeSelectTTK,
  makeSelectWidgetCode,
} from './selectors';
import {
  changeCapacity,
  changeQueueCommand,
  changeTTI,
  changeTTK,
  changeWidgetCode,
} from './actions';
import Panel from '../../components/Panel';
import PanelTitle from '../../components/Panel/PanelTitle';
import HintParagraph from '../../components/Tooltip/HintParagraph';
import StyledTextField from '../../components/StyledTextField';
import AdFrame from '../../components/AdFrame';
import QueueWidgetDialog from './QueueWidgetDialog';

export const QueueRules = (props) => {
  const intl = useIntl();
  const handleInputValueChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    if (value.length < 140 && name === 'command')
      props.changeQueueCommand(value);
    if (name === 'capacity') props.changeCapacity(parseInt(value, 10));
    if (name === 'timeToIdle') props.changeTTI(parseInt(value, 10));
    if (name === 'timeToKick') props.changeTTK(parseInt(value, 10));
    if (name === 'widgetCode') {
      props.changeWidgetCode(value);
      return;
    }
    localStorage.setItem(`queue-${name}`, value);
  };

  return (
    <Panel>
      <PanelTitle>
        <FormattedMessage {...messages.rulesPanelTitle} />
      </PanelTitle>
      <Tooltip
        title={
          <HintParagraph>
            <FormattedMessage {...messages.commandTextFieldTooltip} />
          </HintParagraph>
        }
        aria-label="keyword"
      >
        <StyledTextField
          autoFocus
          margin="dense"
          name="command"
          onChange={handleInputValueChange}
          label={intl.formatMessage({...messages.commandTextFieldLabel})}
          type="text"
          value={props.command}
          variant="standard"
          fullWidth
        />
      </Tooltip>
      <Tooltip
        title={
          <div>
            <HintParagraph>
              <FormattedMessage {...messages.capacityTextFieldTooltip1} />
            </HintParagraph>
            <HintParagraph>
              <FormattedMessage {...messages.capacityTextFieldTooltip2} />
            </HintParagraph>
          </div>
        }
        aria-label="keyword"
      >
        <StyledTextField
          autoFocus
          margin="dense"
          name="capacity"
          onChange={handleInputValueChange}
          label={intl.formatMessage({...messages.capacityTextFieldLabel})}
          type="number"
          value={props.capacity}
          variant="standard"
          fullWidth
        />
      </Tooltip>
      <StyledTextField
        autoFocus
        margin="dense"
        name="timeToIdle"
        onChange={handleInputValueChange}
        label={intl.formatMessage({...messages.timeToIdleTextField})}
        type="number"
        value={Number(props.timeToIdle)}
        variant="standard"
        fullWidth
      />
      <StyledTextField
        autoFocus
        margin="dense"
        name="timeToKick"
        onChange={handleInputValueChange}
        label={intl.formatMessage({...messages.timeToKickTextField})}
        type="number"
        value={Number(props.timeToKick)}
        variant="standard"
        fullWidth
      />
      <StyledTextField
        autoFocus
        margin="dense"
        name="widgetCode"
        onChange={handleInputValueChange}
        label={intl.formatMessage({...messages.widgetCodeTextField})}
        type="password"
        value={props.widgetCode}
        variant="standard"
        fullWidth
      />
      <QueueWidgetDialog />
      <AdFrame />
    </Panel>
  );
};

QueueRules.propTypes = {
  changeCapacity: PropTypes.func.isRequired,
  changeQueueCommand: PropTypes.func.isRequired,
  changeTTI: PropTypes.func.isRequired,
  changeTTK: PropTypes.func.isRequired,
  changeWidgetCode: PropTypes.func.isRequired,
  capacity: PropTypes.number.isRequired,
  command: PropTypes.string,
  timeToIdle: PropTypes.number,
  timeToKick: PropTypes.number.isRequired,
  widgetCode: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  capacity: makeSelectCapacity(),
  command: makeSelectQueueCommand(),
  timeToIdle: makeSelectTTI(),
  timeToKick: makeSelectTTK(),
  widgetCode: makeSelectWidgetCode(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changeCapacity: (cap) => dispatch(changeCapacity(cap)),
    changeQueueCommand: (command) => dispatch(changeQueueCommand(command)),
    changeTTI: (s) => dispatch(changeTTI(s)),
    changeTTK: (s) => dispatch(changeTTK(s)),
    changeWidgetCode: (code) => dispatch(changeWidgetCode(code)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueRules);
