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

const ColoredLink = styled.a`
  color: ${(props) => props.theme.color};
  display: block;
  padding-top: 5px;
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
            </DialogContentText>
            <DialogContentText>
              <FormattedMessage {...messages.adDialogThirdLine} />
              <Typography>Discord: Baf#5501</Typography>
              <ColoredLink href="https://www.facebook.com/BafYT/">
                https://www.facebook.com/BafYT/
              </ColoredLink>
              <ColoredLink href="https://www.instagram.com/grafika3d/">
                Instagram grafika3d
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
