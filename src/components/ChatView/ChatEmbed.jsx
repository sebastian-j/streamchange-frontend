import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectDarkMode } from '../../containers/StyleProvider/selectors';
import ChatEmbed from './ChatEmbedComponent';

const mapStateToProps = createStructuredSelector({
  isDarkMode: makeSelectDarkMode(),
});

export default connect(mapStateToProps)(ChatEmbed);
