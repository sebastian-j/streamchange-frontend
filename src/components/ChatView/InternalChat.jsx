import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectMessages } from './selectors';
import InternalChat from './InternalChatComponent';

const mapStateToProps = createStructuredSelector({
  messages: makeSelectMessages(),
});

export default connect(mapStateToProps, null)(InternalChat);
