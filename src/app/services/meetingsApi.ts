import api from './api.ts';
import { Meeting } from '../types.ts';

type GetMeetingsResponse = Meeting[];

export type GetMeetingsRequest = Partial<{
  title: string;
  ownerName: string;
  startDate: string;
  endDate: string;
  category: string;
}>;

interface AddMeetingRequest {
  ownerId: number;
  title: string;
  description: string;
  startedAt: string;
  endedAt: string;
  usersIds: number[];
}

const meetingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMeetings: builder.query<GetMeetingsResponse, GetMeetingsRequest>({
      query: (body) => ({
        url: '/Calendar/filter',
        method: 'POST',
        body,
        //url: '/users/1/meeetings',
      }),
      providesTags: ['Meeting'],
    }),
    getMeeting: builder.query<GetMeetingsResponse, string>({
      query: (id) => ({
        url: `/Calendar/${id}`,
      }),
    }),
    addMeeting: builder.mutation<Meeting, AddMeetingRequest>({
      query: (body) => ({
        url: 'Calendar/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Meeting'],
    }),
  }),
});

export const { useGetMeetingsQuery, useAddMeetingMutation } = meetingsApi;
