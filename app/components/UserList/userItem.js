import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style.css';

export default class UserItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleEligible = this.toggleEligible.bind(this);
  }

  componentDidMount() {}

  toggleEligible() {
    this.props.handleToggleUser(this.props.channelId);
  }

  render() {
    return (
      <li
        className={clsx('user-item', this.props.isEligible && 'isEligible')}
        onClick={this.toggleEligible}
      >
        <svg
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
          <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z" />
        </svg>
        <span>{this.props.title}</span>
        {this.props.isModerator && (
          <svg
            viewBox="0 0 16 16"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
            style={{ display: 'inline-block', marginLeft: '5px' }}
            className="style-scope yt-icon"
          >
            <g className="style-scope yt-icon">
              <path
                d="M9.64589146,7.05569719 C9.83346524,6.562372 9.93617022,6.02722257 9.93617022,5.46808511 C9.93617022,3.00042984 7.93574038,1 5.46808511,1 C4.90894765,1 4.37379823,1.10270499 3.88047304,1.29027875 L6.95744681,4.36725249 L4.36725255,6.95744681 L1.29027875,3.88047305 C1.10270498,4.37379824 1,4.90894766 1,5.46808511 C1,7.93574038 3.00042984,9.93617022 5.46808511,9.93617022 C6.02722256,9.93617022 6.56237198,9.83346524 7.05569716,9.64589147 L12.4098057,15 L15,12.4098057 L9.64589146,7.05569719 Z"
                className="style-scope yt-icon"
              />
            </g>
          </svg>
        )}
        {this.props.isSponsor && (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
            <path fill="none" d="M0 0h24v24H0z" />
          </svg>
        )}
      </li>
    );
  }
}

UserItem.propTypes = {
  channelId: PropTypes.string,
  title: PropTypes.string.isRequired,
  isModerator: PropTypes.bool,
  isSponsor: PropTypes.bool,
  isEligible: PropTypes.bool,
  handleToggleUser: PropTypes.func.isRequired,
};
