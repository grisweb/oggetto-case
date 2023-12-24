import api from './api.ts';
import { Meeting } from '../types.ts';

type GetMeetingsResponse = Meeting[];

const meetingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMeetings: builder.query<GetMeetingsResponse, null>({
      query: () => ({
        //url: '/Calendar',
        url: '/users/1/meeetings',
      }),
    }),
  }),
});

export const { useGetMeetingsQuery } = meetingsApi;
