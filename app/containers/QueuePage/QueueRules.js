import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import {
  makeSelectCapacity,
  makeSelectQueueCommand,
  makeSelectTTI,
  makeSelectTTK,
} from './selectors';
import {
  changeCapacity,
  changeQueueCommand,
  changeTTI,
  changeTTK,
} from './actions';
import Panel from '../../components/Panel';
import PanelTitle from '../../components/Panel/PanelTitle';
import StyledTextField from '../../components/StyledTextField';

export const QueueRules = props => {
  const handleInputValueChange = event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    if (value.length < 140 && name === 'command')
      props.changeQueueCommand(value);
    if (name === 'capacity') props.changeCapacity(value);
    if (name === 'timeToIdle') props.changeTTI(value);
    if (name === 'timeToKick') props.changeTTK(value);
    localStorage.setItem(`queue-${name}`, value);
  };

  return (
    <Panel>
      <PanelTitle>
        <FormattedMessage {...messages.rulesPanelTitle} />
      </PanelTitle>
      <FormattedMessage {...messages.commandTextField}>
        {label => (
          <StyledTextField
            autoFocus
            margin="dense"
            name="command"
            onChange={handleInputValueChange}
            label={label}
            type="text"
            value={props.command}
            fullWidth
          />
        )}
      </FormattedMessage>
      <FormattedMessage {...messages.capacityTextField}>
        {label => (
          <StyledTextField
            autoFocus
            margin="dense"
            name="capacity"
            onChange={handleInputValueChange}
            label={label}
            type="number"
            value={props.capacity}
            fullWidth
          />
        )}
      </FormattedMessage>
      <FormattedMessage {...messages.timeToIdleTextField}>
        {label => (
          <StyledTextField
            autoFocus
            margin="dense"
            name="timeToIdle"
            onChange={handleInputValueChange}
            label={label}
            type="number"
            value={Number(props.timeToIdle)}
            fullWidth
          />
        )}
      </FormattedMessage>
      <FormattedMessage {...messages.timeToKickTextField}>
        {label => (
          <StyledTextField
            autoFocus
            margin="dense"
            name="timeToKick"
            onChange={handleInputValueChange}
            label={label}
            type="number"
            value={Number(props.timeToKick)}
            fullWidth
          />
        )}
      </FormattedMessage>
    </Panel>
  );
};

QueueRules.propTypes = {
  changeCapacity: PropTypes.func.isRequired,
  changeQueueCommand: PropTypes.func.isRequired,
  changeTTI: PropTypes.func.isRequired,
  changeTTK: PropTypes.func.isRequired,
  capacity: PropTypes.number.isRequired,
  command: PropTypes.string,
  timeToIdle: PropTypes.number,
  timeToKick: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  capacity: makeSelectCapacity(),
  command: makeSelectQueueCommand(),
  timeToIdle: makeSelectTTI(),
  timeToKick: makeSelectTTK(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changeCapacity: cap => dispatch(changeCapacity(cap)),
    changeQueueCommand: command => dispatch(changeQueueCommand(command)),
    changeTTI: s => dispatch(changeTTI(s)),
    changeTTK: s => dispatch(changeTTK(s)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QueueRules);
