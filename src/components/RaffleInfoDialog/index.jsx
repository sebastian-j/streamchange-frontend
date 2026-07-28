import { useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import messages from './messages';
import reelPreview from './assets/reel.webp';
import wheelPreview from './assets/wheel.webp';

const METHODS = [
  {
    label: messages.tabReel,
    tagline: messages.reelTagline,
    description: messages.reelDescription,
    preview: reelPreview,
  },
  {
    label: messages.tabWheel,
    tagline: messages.wheelTagline,
    description: messages.wheelDescription,
    preview: wheelPreview,
  },
];

// react-intl rich-text tags used inside the description messages.
const richValues = {
  b: (chunks) => <strong>{chunks}</strong>,
  br: () => <br />,
};

const HelpIcon = styled.svg`
  fill: ${(props) => props.theme.color};
  height: 22px;
  width: 22px;
`;

const PreviewBox = styled(Box)`
  align-items: center;
  aspect-ratio: 4 / 4;
  background: ${(props) => props.theme.buttonBackground};
  border: 1px solid ${(props) => props.theme.color};
  box-shadow: 0 0 24px -6px ${(props) => props.theme.color};
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;

  img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

const StyledTabs = styled(Tabs)`
  & .MuiTabs-indicator {
    background-color: ${(props) => props.theme.color};
  }
  & .MuiTab-root.Mui-selected {
    color: ${(props) => props.theme.color};
  }
`;

const AccentBar = styled.span`
  background: ${(props) => props.theme.color};
  display: block;
  height: 3px;
  margin-top: 6px;
  width: 100%;
`;

const TriggerButton = styled(Button)`
  && {
    color: ${(props) => props.theme.color};
    justify-content: flex-start;
    padding-left: 0;
    text-transform: none;
  }
`;

const paperSx = { borderRadius: 0 };

const RaffleInfoDialog = () => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const method = METHODS[tab];
  const methodLabel = intl.formatMessage(method.label);

  return (
    <>
      <TriggerButton
        onClick={openDialog}
        size="small"
        startIcon={
          <HelpIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
          </HelpIcon>
        }
      >
        <FormattedMessage {...messages.trigger} />
      </TriggerButton>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: paperSx }}
        aria-labelledby="raffle-info-title"
      >
        <DialogTitle
          id="raffle-info-title"
          sx={{ px: 5, pt: 4, pb: 2, fontSize: '1.6rem', fontWeight: 700 }}
        >
          <FormattedMessage {...messages.dialogTitle} />
        </DialogTitle>
        <DialogContent dividers sx={{ px: 5, py: 4 }}>
          <StyledTabs
            value={tab}
            onChange={(_event, value) => setTab(value)}
            variant="fullWidth"
            textColor="inherit"
            sx={{ mb: 4, '& .MuiTab-root': { fontSize: '1rem', py: 2 } }}
          >
            {METHODS.map((m) => (
              <Tab key={m.label.id} label={intl.formatMessage(m.label)} />
            ))}
          </StyledTabs>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 5,
              alignItems: 'stretch',
            }}
          >
            <Box sx={{ flex: '1 1 55%', minWidth: 0 }}>
              <PreviewBox>
                {method.preview ? (
                  <img
                    src={method.preview}
                    alt={intl.formatMessage(messages.previewAlt, {
                      method: methodLabel,
                    })}
                  />
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    <FormattedMessage {...messages.previewSoon} />
                  </Typography>
                )}
              </PreviewBox>
            </Box>
            <Box
              sx={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {methodLabel}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                <FormattedMessage {...method.tagline} />
              </Typography>
              <AccentBar />
              <Typography
                variant="body1"
                paragraph
                sx={{ mt: 3, lineHeight: 1.7, textAlign: 'justify' }}
              >
                <FormattedMessage {...method.description} values={richValues} />
              </Typography>
              <Button
                onClick={closeDialog}
                color="inherit"
                sx={{ mt: 'auto', alignSelf: 'flex-end' }}
              >
                <FormattedMessage {...messages.closeBtn} />
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RaffleInfoDialog;
