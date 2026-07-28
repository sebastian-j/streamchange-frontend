import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  makeSelectGiveawayPrize,
  makeSelectGiveawayRequirement,
} from './selectors';
import { changePrize, changeRequirement } from './actions';
import { makeSelectStreamInfo } from '../../containers/GiveawayPage/selectors';
import GiveawayRules from './GiveawayRulesComponent';

const mapStateToProps = createStructuredSelector({
  prize: makeSelectGiveawayPrize(),
  requirement: makeSelectGiveawayRequirement(),
  streamInfo: makeSelectStreamInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePrize: (a) => dispatch(changePrize(a)),
    changeReq: (r) => dispatch(changeRequirement(r)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveawayRules);
