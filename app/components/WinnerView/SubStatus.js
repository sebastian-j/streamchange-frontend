import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { makeSelectStreamInfo } from '../../containers/HomePage/selectors';
import RelativeDate from '../RelativeDate';

const Subscribed = styled.span`
  color: ${(props) => props.theme.subStatusPositive};
  font-weight: bold;
  font-size: 0.9rem;
  padding-bottom: 3px;
`;

const NotSubscribed = styled.span`
  color: ${(props) => props.theme.subStatusNegative};
  font-weight: bold;
  font-size: 0.9rem;
  padding-bottom: 3px;
`;

const PrivateSubs = styled.span`
  color: ${(props) => props.theme.staticTextColor};
  font-size: 0.9rem;
  max-width: 60%;
  padding-bottom: 3px;
`;

const SubStatus = (props) => {
  const [status, setStatus] = useState(null);
  const [subscriberFrom, setSubscriberFrom] = useState(null);

  const checkStatus = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=${props.id}&forChannelId=${props.streamInfo.ownerId}&fields=items/snippet/publishedAt&key=${props.apiKey}`,
      )
      .then((res) => {
        if (res.data.items.length > 0) {
          setStatus('true');
          setSubscriberFrom(res.data.items[0].snippet.publishedAt);
        } else {
          setStatus('false');
        }
      })
      .catch((err) => {
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
        <FormattedMessage {...messages.notSubscribed} />
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
  streamInfo: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  streamInfo: makeSelectStreamInfo(),
});

export default connect(mapStateToProps, null)(SubStatus);
