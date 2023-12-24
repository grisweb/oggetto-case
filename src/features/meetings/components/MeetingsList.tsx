import { FC } from 'react';
import { Box, CircularProgress, Grid, styled, Typography } from '@mui/material';

import { useGetMeetingsQuery } from '../../../app/services/meetingsApi.ts';
import { useAppSelector } from '../../../app/hooks.ts';
import MeetingCard from './MeetingCard.tsx';

const NoDataContainer = styled(Box)({
  width: '100%',
  height: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const MeetingsList: FC = () => {
  const { data, isLoading } = useGetMeetingsQuery(null);

  const sidebarOpened = useAppSelector((state) => state.layout.sidebarOpened);

  if (isLoading) {
    return (
      <NoDataContainer height="100%">
        <CircularProgress />
      </NoDataContainer>
    );
  }

  if (!data || !data.length) {
    return (
      <NoDataContainer>
        <Typography variant="subtitle2">Нет событий</Typography>
      </NoDataContainer>
    );
  }

  return (
    <Grid container spacing={3} columns={12}>
      {data.map((meeting) => (
        <Grid key={meeting.id} item xs={sidebarOpened ? 4 : 3}>
          <MeetingCard meeting={meeting} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MeetingsList;
