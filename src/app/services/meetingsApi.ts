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
  userIds: number[];
}

type EditMeetingRequest = Omit<AddMeetingRequest, 'ownerId'> & {
  id: string;
};

const meetingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMeetings: builder.query<GetMeetingsResponse, GetMeetingsRequest>({
      query: (body) => ({
        url: '/Calendar/filter',
        method: 'POST',
        body,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Meeting' as const, id })),
              'Meeting',
            ]
          : ['Meeting'],
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
    editMeeting: builder.mutation<Meeting, EditMeetingRequest>({
      query: (body) => ({
        url: `Calendar/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Meeting'],
    }),
    deleteMeeting: builder.mutation<null, string>({
      query: (id) => ({
        url: `Calendar/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Meeting'],
    }),
  }),
});

export const {
  useGetMeetingsQuery,
  useAddMeetingMutation,
  useDeleteMeetingMutation,
  useEditMeetingMutation,
} = meetingsApi;
