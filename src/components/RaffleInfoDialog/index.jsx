import { useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import reelPreview from './assets/reel.webp';
import wheelPreview from './assets/wheel.webp';
const METHODS = [
  {
    label: 'Maszyna losująca',
    tagline: 'Pionowy bęben w stylu Slotsowym',
    preview: reelPreview,
    paragraphs: [
      <>
        Nazwy uczestników przewijają się <strong>pionowo</strong> jak bębny w
        slocie i stopniowo zwalniają. <br />
        Rolka zatrzymuje się na jednym uczestniku - to on zostaje zwycięzcą. Im
        dłuższy czas animacji, tym dłużej trwa zwalnianie. Sprawdza się, gdy
        chcesz budować napięcie liniowo, aż do finałowego „stopu".
      </>,
    ],
  },
  {
    label: 'Koło fortuny',
    tagline: 'Obrotowe koło z wycinkami dla uczestników',
    preview: wheelPreview,
    paragraphs: [
      <>
        Przed rozpoczęciem losowania system wybiera spośród wszystkich
        uczestników maksymalnie <strong>30 osób</strong>, które umieszcza na
        kole fortuny. Uczestnicy są rozłożeni jako wycinki koła.
        <br /> Koło rozpędza się, a następnie hamuje, aż wskaźnik zatrzyma się
        na jednym z pól. Pole wskazane przez strzałkę wyłania zwycięzcę. Czas
        animacji decyduje, jak długo koło się kręci przed zatrzymaniem. Dobre,
        gdy chcesz efektowne, obrotowe losowanie w stylu koła fortuny.
      </>,
    ],
  },
];

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
  display: inline-block;
  height: 3px;
  margin-top: 6px;
  width: 351px;
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
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const method = METHODS[tab];

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
        Jak działają metody losowania?
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
          Jak wyglądają metody losowania?
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
              <Tab key={m.label} label={m.label} />
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
                  <img src={method.preview} alt={`Podgląd: ${method.label}`} />
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    Podgląd wkrótce
                  </Typography>
                )}
              </PreviewBox>
            </Box>
            <Box
              sx={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {method.label}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {method.tagline}
              </Typography>
              <AccentBar />
              <Box sx={{ mt: 3 }}>
                {method.paragraphs.map((text, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    paragraph
                    sx={{ lineHeight: 1.7, textAlign: 'justify' }}
                  >
                    {text}
                  </Typography>
                ))}
              </Box>
              <Button
                onClick={closeDialog}
                color="inherit"
                sx={{ mt: 'auto', alignSelf: 'flex-end' }}
              >
                Zamknij
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RaffleInfoDialog;
