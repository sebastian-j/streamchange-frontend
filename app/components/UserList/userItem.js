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
        <span>{this.props.title}</span>
      </li>
    );
  }
}

UserItem.propTypes = {
  channelId: PropTypes.string,
  title: PropTypes.string.isRequired,
  isEligible: PropTypes.bool,
  handleToggleUser: PropTypes.func.isRequired,
};
