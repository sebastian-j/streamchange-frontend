import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import messages from './messages';
import ColoredLink from '../SupportInformation/ColoredLink';
import PromotedBanner from './PromotedBanner';
import PromotedChannel from './PromotedChannel';
import PromotedVideo from './PromotedVideo';

const AdPlaceholder = styled.div`
  border: 1px solid #7b7b7b;
  color: #7b7b7b;
  padding: 14px;
  position: relative;
  top: 28vh;
`;

const AdFrame = () => {
  const [promotedContent, setPromotedContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const getToday = () => {
    const d = new Date();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  };

  const getPromotedChannels = () => {
    axios.get('../static/sellers.json').then((res) => {
      if (res.data.items) {
        for (let i = 0; i < res.data.items.length; i += 1) {
          if (res.data.items[i].date.includes(getToday()))
            setPromotedContent(res.data.items[i]);
        }
      } else {
        setPromotedContent(null);
      }
    });
  };

  useEffect(() => {
    getPromotedChannels();
  }, []);

  if (promotedContent === null) {
    return (
      <div>
        <AdPlaceholder>
          <span>
            <FormattedMessage {...messages.emptyAdText} />
          </span>
          <Button onClick={openDialog} color="primary">
            <FormattedMessage {...messages.showMoreBtn} />
          </Button>
        </AdPlaceholder>
        <Dialog
          open={isOpen}
          onClose={closeDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <FormattedMessage {...messages.adDialogTitle} />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <FormattedMessage {...messages.adDialogFirstLine} />
            </DialogContentText>
            <DialogContentText>
              <FormattedMessage {...messages.adDialogSecondLine} />
              <ColoredLink href="/docs/advertisers-rules" target="_blank">
                <FormattedMessage {...messages.adDialogRulesLink} />
                <svg
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <g>
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                  </g>
                </svg>
              </ColoredLink>
            </DialogContentText>
            <DialogContentText>
              <FormattedMessage {...messages.adDialogThirdLine} />
              <Typography>Discord: Baf#5501</Typography>
              <ColoredLink href="https://www.facebook.com/BafYT/">
                Facebook Baf
                <svg
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <g>
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                  </g>
                </svg>
              </ColoredLink>
            </DialogContentText>
            <DialogContentText>
              <ColoredLink href="https://www.instagram.com/grafika3d/">
                Instagram grafika3d
                <svg
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <g>
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                  </g>
                </svg>
              </ColoredLink>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="secondary">
              <FormattedMessage {...messages.adDialogCloseBtn} />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  if (promotedContent.kind === 'channel') {
    return (
      <PromotedChannel
        channelUrl={promotedContent.channelUrl}
        description={promotedContent.description}
        imageUrl={promotedContent.imageUrl}
        title={promotedContent.title}
      />
    );
  }
  if (promotedContent.kind === 'image') {
    return (
      <PromotedBanner
        channelUrl={promotedContent.channelUrl}
        imageUrl={promotedContent.imageUrl}
        title={promotedContent.title}
      />
    );
  }
  if (promotedContent.kind === 'video') {
    return (
      <PromotedVideo
        description={promotedContent.description}
        videoId={promotedContent.videoId}
      />
    );
  }
  return <div />;
};

export default AdFrame;
