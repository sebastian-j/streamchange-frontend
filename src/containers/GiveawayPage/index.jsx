import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { makeSelectBanStatus, makeSelectStreamInfo } from './selectors';
import { changeStreamProperties, sendTelemetryData } from './actions';
import { purgeList } from '../../components/UserList/actions';
import GiveawayPage from './GiveawayPageComponent';

const mapStateToProps = createStructuredSelector({
  ban: makeSelectBanStatus(),
  streamInfo: makeSelectStreamInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeStreamProperties: (st) => dispatch(changeStreamProperties(st)),
    sendTelemetryData: (st) => dispatch(sendTelemetryData(st)),
    clearUserList: () => dispatch(purgeList()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveawayPage);
