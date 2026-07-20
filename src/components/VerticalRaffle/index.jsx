import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectGiveawayPreWinner,
  makeSelectGiveawayRequirement,
} from '../GiveawayRules/selectors';
import { makeSelectUserArray } from '../UserList/selectors';
import VerticalRaffle from './VerticalRaffleComponent';

const mapStateToProps = createStructuredSelector({
  giveawayReq: makeSelectGiveawayRequirement(),
  preWinner: makeSelectGiveawayPreWinner(),
  userArray: makeSelectUserArray(),
});

export default connect(mapStateToProps, null)(VerticalRaffle);
