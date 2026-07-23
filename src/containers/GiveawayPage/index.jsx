import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import GiveawayPage from './GiveawayPageComponent';
import { makeSelectStreamInfo } from './selectors';
import { changeStreamProperties } from './actions';
import { purgeList } from '../../components/UserList/actions';

const mapStateToProps = createStructuredSelector({
  streamInfo: makeSelectStreamInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeStreamProperties: (st) => dispatch(changeStreamProperties(st)),
    clearUserList: () => dispatch(purgeList()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveawayPage);
