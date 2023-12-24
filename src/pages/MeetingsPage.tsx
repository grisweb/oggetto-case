import { FC, useState } from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

import BodyHeader from '../features/layout/components/BodyHeader.tsx';
import BodyContent from '../features/layout/components/BodyContent.tsx';
import MeetingsList from '../features/meetings/components/MeetingsList.tsx';
import MeetingFormModal from '../features/meetings/components/MeetingFormModal.tsx';

const MeetingsPage: FC = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BodyHeader
        title="Встречи"
        actions={
          <Button onClick={handleClick} startIcon={<Add />}>
            Создать встречу
          </Button>
        }
      />
      <BodyContent>
        <MeetingsList />
      </BodyContent>
      <MeetingFormModal open={open} onClose={handleClose} />
    </>
  );
};

export default MeetingsPage;
