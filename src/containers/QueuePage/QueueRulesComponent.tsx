import { FormattedMessage, useIntl } from 'react-intl';

import Tooltip from '@mui/material/Tooltip';
import messages from './messages';
import Panel from '../../components/Panel';
import PanelTitle from '../../components/Panel/PanelTitle';
import HintParagraph from '../../components/Tooltip/HintParagraph';
import StyledTextField from '../../components/StyledTextField';
import AdFrame from '../../components/AdFrame';
import QueueWidgetDialog from './QueueWidgetDialog';

type QueueRulesProps = {
  changeCapacity: (capacity: number) => void;
  changeQueueCommand: (command: string) => void;
  changeTTI: (timeToIdle: number) => void;
  changeTTK: (timeToKick: number) => void;
  changeWidgetCode: (widgetCode: string) => void;
  capacity: number;
  command?: string;
  timeToIdle?: number;
  timeToKick: number;
  widgetCode?: string;
};

const QueueRules = (props: QueueRulesProps) => {
  const intl = useIntl();
  const handleInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

export default QueueRules;
