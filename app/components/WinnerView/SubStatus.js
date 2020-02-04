import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
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

const SubStatus = props => {
  const [status, setStatus] = useState(null);
  const [subscriberFrom, setSubscriberFrom] = useState(null);

  const checkStatus = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=${
          props.id
        }&forChannelId=${props.ownerId}&key=${props.apiKey}`,
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
        Subskrybuje od&nbsp;
        <RelativeDate ISO8601Date={subscriberFrom} />
      </Subscribed>
    );
  }
  if (status === 'false') {
    return <NotSubscribed>Nie subskrybuje</NotSubscribed>;
  }
  if (status === 'private') {
    return <PrivateSubs>Subskrypcje prywatne</PrivateSubs>;
  }
  return <PrivateSubs>Nie wiadomo czy subskrybuje</PrivateSubs>;
};

SubStatus.propTypes = {
  apiKey: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
};

export default SubStatus;