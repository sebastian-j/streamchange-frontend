import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
import QueueRules from './QueueRulesComponent';

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
