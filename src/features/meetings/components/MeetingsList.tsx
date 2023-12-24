import { FC, useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  styled,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import dayjs from 'dayjs';

import {
  GetMeetingsRequest,
  useGetMeetingsQuery,
} from '../../../app/services/meetingsApi.ts';
import { useAppSelector } from '../../../app/hooks.ts';
import MeetingCard from './MeetingCard.tsx';

enum MeetingsListDateFilters {
  upcoming,
  past,
  all,
}

const NoDataContainer = styled(Box)({
  width: '100%',
  height: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const getDateByFilter = (
  filter: MeetingsListDateFilters,
  currentDate: string,
) => {
  switch (filter) {
    case MeetingsListDateFilters.all:
      return {
        endDate: undefined,
        startDate: undefined,
      };
    case MeetingsListDateFilters.past:
      return { endDate: currentDate, startDate: undefined };
    case MeetingsListDateFilters.upcoming:
      return { startDate: currentDate, endDate: undefined };
  }
};

const MeetingsList: FC = () => {
  const sidebarOpened = useAppSelector((state) => state.layout.sidebarOpened);

  const [dateFilter, setDateFilter] = useState(
    MeetingsListDateFilters.upcoming,
  );

  const [filter, setFilter] = useState<GetMeetingsRequest>(() => {
    const currentDate = dayjs().toISOString();

    return {
      ...getDateByFilter(dateFilter, currentDate),
    };
  });

  useEffect(() => {
    const currentDate = dayjs().toISOString();

    setFilter({
      ...filter,
      ...getDateByFilter(dateFilter, currentDate),
    });
  }, [dateFilter]);

  const { data, isLoading } = useGetMeetingsQuery(filter);

  const filterHandleChange = (_: unknown, value: MeetingsListDateFilters) => {
    setDateFilter(value);
  };

  if (isLoading) {
    return (
      <NoDataContainer
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          height: 'auto',
        }}
      >
        <CircularProgress />
      </NoDataContainer>
    );
  }

  return (
    <>
      <Box>
        <ToggleButtonGroup
          color="primary"
          value={dateFilter}
          exclusive
          onChange={filterHandleChange}
          aria-label="Platform"
        >
          <ToggleButton value={MeetingsListDateFilters.upcoming}>
            Предстоящие события
          </ToggleButton>
          <ToggleButton value={MeetingsListDateFilters.past}>
            Прошедшие события
          </ToggleButton>
          <ToggleButton value={MeetingsListDateFilters.all}>
            Все события
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {!data || !data.length ? (
        <NoDataContainer>
          <Typography variant="subtitle2">Нет событий</Typography>
        </NoDataContainer>
      ) : (
        <Grid container spacing={3} columns={12}>
          {data.map((meeting) => (
            <Grid key={meeting.id} item xs={sidebarOpened ? 4 : 3}>
              <MeetingCard meeting={meeting} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default MeetingsList;
