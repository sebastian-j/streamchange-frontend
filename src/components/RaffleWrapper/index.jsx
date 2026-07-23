import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  makeSelectAnimation,
  makeSelectDuration,
  makeSelectVisibility,
} from './selectors';
import {
  changeAnimation,
  changeAnimationDuration,
  changeVisibility,
} from './actions';
import { makeSelectUserArray } from '../UserList/selectors';
import { makeSelectGiveawayRequirement } from '../GiveawayRules/selectors';
import RaffleWrapper from './RaffleWrapperComponent';

const mapStateToProps = createStructuredSelector({
  animationDuration: makeSelectDuration(),
  animationType: makeSelectAnimation(),
  giveawayReq: makeSelectGiveawayRequirement(),
  isOpen: makeSelectVisibility(),
  userArray: makeSelectUserArray(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeAnimationDuration: (t) => dispatch(changeAnimationDuration(t)),
    changeAnimationType: (a) => dispatch(changeAnimation(a)),
    closeRaffle: () => dispatch(changeVisibility(false)),
    openRaffle: () => dispatch(changeVisibility(true)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RaffleWrapper);
