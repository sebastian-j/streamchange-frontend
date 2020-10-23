import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import RelativeDate from '../RelativeDate';

const Subscribed = styled.span`
  color: ${props => props.theme.subStatusPositive};
  font-weight: bold;
  font-size: 0.9rem;
  padding-bottom: 3px;
`;

const NotSubscribed = styled.span`
  color: ${props => props.theme.subStatusNegative};
  font-weight: bold;
  font-size: 0.9rem;
  padding-bottom: 3px;
`;

const PrivateSubs = styled.span`
  color: ${props => props.theme.staticTextColor};
  font-size: 0.9rem;
  padding-bottom: 3px;
`;

const ExtendedTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: 'rgba(225,246,246,0.95)',
    color: 'rgb(0, 0, 0)',
    maxWidth: '250px',
    fontSize: theme.typography.pxToRem(15),
    border: '1px solid #949499',
  },
}))(Tooltip);

const SubStatus = props => {
  const [status, setStatus] = useState(null);
  const [subscriberFrom, setSubscriberFrom] = useState(null);

  const checkStatus = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=${
          props.id
        }&forChannelId=${props.ownerId}&fields=items/snippet/publishedAt&key=${
          props.apiKey
        }`,
      )
      .then(res => {
        if (res.data.items.length > 0) {
          setStatus('true');
          setSubscriberFrom(res.data.items[0].snippet.publishedAt);
        } else {
          setStatus('false');
        }
      })
      .catch(err => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.error.errors[0].reason === 'subscriptionForbidden'
        ) {
          setStatus('private');
        } else {
          setStatus('error');
        }
      });
  };

  useEffect(() => {
    checkStatus();
  }, []);
  if (!status) {
    return <PrivateSubs>...</PrivateSubs>;
  }
  if (status === 'true') {
    return (
      <Subscribed>
        <FormattedMessage {...messages.subscriberFrom} />
        <RelativeDate ISO8601Date={subscriberFrom} />
      </Subscribed>
    );
  }
  if (status === 'false') {
    return (
      <NotSubscribed>
        <FormattedMessage {...messages.notSubscribed} />{' '}
        <ExtendedTooltip
          title={
            <React.Fragment>
              <FormattedMessage {...messages.subscriberDisclaimer} />
            </React.Fragment>
          }
        >
          <span role="img" aria-label="speech balloon">
            💬
          </span>
        </ExtendedTooltip>
      </NotSubscribed>
    );
  }
  if (status === 'private') {
    return (
      <PrivateSubs>
        <FormattedMessage {...messages.subscriberPrivate} />
      </PrivateSubs>
    );
  }
  return (
    <PrivateSubs>
      <FormattedMessage {...messages.subscriberUnknown} />
    </PrivateSubs>
  );
};

SubStatus.propTypes = {
  apiKey: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
};

export default SubStatus;
