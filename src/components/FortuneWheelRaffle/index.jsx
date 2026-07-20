import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { makeSelectUserArray } from '../UserList/selectors';
import {
  makeSelectGiveawayRequirement,
  makeSelectGiveawayPreWinner,
} from '../GiveawayRules/selectors';
import FortuneWheelRaffle from './FortuneWheelRaffleComponent';

const mapStateToProps = createStructuredSelector({
  giveawayReq: makeSelectGiveawayRequirement(),
  preWinner: makeSelectGiveawayPreWinner(),
  userArray: makeSelectUserArray(),
});

export default connect(mapStateToProps, null)(FortuneWheelRaffle);
