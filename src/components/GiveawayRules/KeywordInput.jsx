import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { changeKeyword } from './actions';
import { makeSelectGiveawayKeyword } from './selectors';
import KeywordInput from './KeywordInputComponent';

function mapDispatchToProps(dispatch) {
  return {
    changeKeyword: (t) => dispatch(changeKeyword(t)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  keyword: makeSelectGiveawayKeyword(),
});

export default connect(mapStateToProps, mapDispatchToProps)(KeywordInput);
