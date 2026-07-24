import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectGiveawayPreWinner,
  makeSelectGiveawayRequirement,
} from '../GiveawayRules/selectors';
import { makeSelectUserArray } from '../UserList/selectors';
import CSGORaffle from './CSGORaffle';

const mapStateToProps = createStructuredSelector({
  giveawayReq: makeSelectGiveawayRequirement(),
  preWinner: makeSelectGiveawayPreWinner(),
  userArray: makeSelectUserArray(),
});

export default connect(mapStateToProps, null)(CSGORaffle);
