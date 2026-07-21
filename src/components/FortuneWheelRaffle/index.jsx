import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FortuneWheelRaffle from './FortuneWheelRaffleComponent';
import {
  makeSelectGiveawayPreWinner,
  makeSelectGiveawayRequirement,
} from '../GiveawayRules/selectors';
import { makeSelectUserArray } from '../UserList/selectors';

const mapStateToProps = createStructuredSelector({
  giveawayReq: makeSelectGiveawayRequirement(),
  preWinner: makeSelectGiveawayPreWinner(),
  userArray: makeSelectUserArray(),
});

const areEqual = (prevProps, nextProps) =>
  prevProps.duration === nextProps.duration &&
  prevProps.onClose === nextProps.onClose &&
  prevProps.onWin === nextProps.onWin;

export default connect(
  mapStateToProps,
  null
)(memo(FortuneWheelRaffle, areEqual));
