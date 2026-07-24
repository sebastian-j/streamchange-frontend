import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import Tooltip from '@mui/material/Tooltip';
import messages from './messages';
import Panel from '../../components/Panel';
import PanelTitle from '../../components/Panel/PanelTitle';
import HintParagraph from '../../components/Tooltip/HintParagraph';
import StyledTextField from '../../components/StyledTextField';
import AdFrame from '../../components/AdFrame';
import QueueWidgetDialog from './QueueWidgetDialog';

const QueueRules = (props) => {
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
          label={intl.formatMessage({ ...messages.commandTextFieldLabel })}
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
          label={intl.formatMessage({ ...messages.capacityTextFieldLabel })}
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
        label={intl.formatMessage({ ...messages.timeToIdleTextField })}
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
        label={intl.formatMessage({ ...messages.timeToKickTextField })}
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
        label={intl.formatMessage({ ...messages.widgetCodeTextField })}
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

export default QueueRules;
