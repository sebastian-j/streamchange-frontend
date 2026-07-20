import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { changePreWinner } from '../GiveawayRules/actions';
import { changeVisibility } from '../RaffleWrapper/actions';
import { toggleEligibility } from '../UserList/actions';
import { makeSelectGiveawayPreWinner } from '../GiveawayRules/selectors';
import { makeSelectUserArray } from '../UserList/selectors';
import { makeSelectStreamInfo } from '../../containers/GiveawayPage/selectors';
import WinnerView from './WinnerViewComponent';

const mapStateToProps = createStructuredSelector({
  preWinner: makeSelectGiveawayPreWinner(),
  streamInfo: makeSelectStreamInfo(),
  userArray: makeSelectUserArray(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePreWinner: (w) => dispatch(changePreWinner(w)),
    onRepeat: () => dispatch(changeVisibility(true)),
    toggleEligibility: (id) => dispatch(toggleEligibility(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WinnerView);
