import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';
import messages from './messages';

function RelativeDate(props) {
  const dt = new Date(props.ISO8601Date);
  const now = new Date();
  let convertedDate = '';
  if (
    dt.getFullYear() === now.getFullYear() &&
    dt.getMonth() === now.getMonth() &&
    dt.getDate() + 2 === now.getDate()
  ) {
    return (
      <span className={props.className}>
        <FormattedMessage {...messages.beforeYesterday} />
        {` ${dt.getHours()}:${
          dt.getMinutes() < 10 ? '0' : ''
        }${dt.getMinutes()}`}
      </span>
    );
  }
  if (
    dt.getFullYear() === now.getFullYear() &&
    dt.getMonth() === now.getMonth() &&
    dt.getDate() + 1 === now.getDate()
  ) {
    return (
      <span className={props.className}>
        <FormattedMessage {...messages.yesterday} />
        {` ${dt.getHours()}:${
          dt.getMinutes() < 10 ? '0' : ''
        }${dt.getMinutes()}`}
      </span>
    );
  }
  if (now.getTime() - dt.getTime() < 10000) {
    return (
      <span className={props.className}>
        <FormattedMessage {...messages.justNow} />
      </span>
    );
  }
  if (now.getTime() - dt.getTime() < 60000) {
    return (
      <span className={props.className}>
        <FormattedMessage
          {...messages.secondsAgo}
          values={{
            value: `${Math.round((now.getTime() - dt.getTime()) / 1000)}`,
          }}
        />
      </span>
    );
  }
  if (now.getTime() - dt.getTime() < 120000) {
    return (
      <span className={props.className}>
        <FormattedMessage {...messages.minuteAgo} />
      </span>
    );
  }
  if (now.getTime() - dt.getTime() < 270000) {
    return (
      <span className={props.className}>
        <FormattedMessage
          {...messages.fewMinutesAgo}
          values={{
            value: `${Math.round((now.getTime() - dt.getTime()) / 60000)}`,
          }}
        />
      </span>
    );
  }
  if (now.getTime() - dt.getTime() < 3600000) {
    return (
      <span className={props.className}>
        <FormattedMessage
          {...messages.minutesAgo}
          values={{
            value: `${Math.round((now.getTime() - dt.getTime()) / 60000)}`,
          }}
        />
      </span>
    );
  }
  if (
    dt.getFullYear() === now.getFullYear() &&
    dt.getMonth() === now.getMonth() &&
    dt.getDate() === now.getDate()
  ) {
    return (
      <span className={props.className}>
        <FormattedMessage {...messages.today} />
        {` ${dt.getHours()}:${
          dt.getMinutes() < 10 ? '0' : ''
        }${dt.getMinutes()}`}
      </span>
    );
  }
  if (props.ISO8601Date === null) {
    return (
      <span className={props.className}>
        <FormattedMessage {...messages.never} />
      </span>
    );
  }
  convertedDate = ` ${dt.getHours()}:${
    dt.getMinutes() < 10 ? '0' : ''
  }${dt.getMinutes()}`;
  return (
    <span className={props.className}>
      <FormattedDate
        value={new Date(dt)}
        year="numeric"
        month="long"
        day="2-digit"
      />
      {convertedDate}
    </span>
  );
}

RelativeDate.propTypes = {
  className: PropTypes.string,
  ISO8601Date: PropTypes.string.isRequired,
};

RelativeDate.defaultProps = {
  className: 'relativeDate',
};

export default RelativeDate;
