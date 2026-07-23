import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectWidgetCode } from './selectors';
import QueueWidgetDialog from './QueueWidgetDialogComponent';

const mapStateToProps = createStructuredSelector({
  widgetCode: makeSelectWidgetCode(),
});

export default connect(mapStateToProps, null)(QueueWidgetDialog);
