import { FormattedMessage, FormattedDate } from 'react-intl';
import messages from './messages';

type RelativeDateProps = {
  className?: string;
  ISO8601Date: string;
};

function RelativeDate({
  className = 'relativeDate',
  ISO8601Date,
}: RelativeDateProps) {
  const dt = new Date(ISO8601Date);
  const now = new Date();
  if (
    dt.getFullYear() === now.getFullYear() &&
    dt.getMonth() === now.getMonth() &&
    dt.getDate() + 2 === now.getDate()
  ) {
    return (
      <span className={className}>
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
      <span className={className}>
        <FormattedMessage {...messages.yesterday} />
        {` ${dt.getHours()}:${
          dt.getMinutes() < 10 ? '0' : ''
        }${dt.getMinutes()}`}
      </span>
    );
  }
  if (now.getTime() - dt.getTime() < 10000) {
    return (
      <span className={className}>
        <FormattedMessage {...messages.justNow} />
      </span>
    );
  }
  if (now.getTime() - dt.getTime() < 60000) {
    return (
      <span className={className}>
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
      <span className={className}>
        <FormattedMessage {...messages.minuteAgo} />
      </span>
    );
  }
  if (now.getTime() - dt.getTime() < 270000) {
    return (
      <span className={className}>
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
      <span className={className}>
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
      <span className={className}>
        <FormattedMessage {...messages.today} />
        {` ${dt.getHours()}:${
          dt.getMinutes() < 10 ? '0' : ''
        }${dt.getMinutes()}`}
      </span>
    );
  }
  if (ISO8601Date === null) {
    return (
      <span className={className}>
        <FormattedMessage {...messages.never} />
      </span>
    );
  }
  const convertedDate = ` ${dt.getHours()}:${
    dt.getMinutes() < 10 ? '0' : ''
  }${dt.getMinutes()}`;
  return (
    <span className={className}>
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

export default RelativeDate;
