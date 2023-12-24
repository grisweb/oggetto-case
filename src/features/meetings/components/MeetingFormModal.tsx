import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  styled,
  CircularProgress,
} from '@mui/material';

import { Meeting } from '../../../app/types.ts';
import { useGetUsersQuery } from '../../../app/services/usersApi.ts';
import RHFTextField from '../../form/components/RHFTextField.tsx';
import RHForm from '../../form/components/RHForm.tsx';
import UsersField from './UsersField.tsx';
import DateTimeFields from './DateTimeFields.tsx';
import { useAddMeetingMutation } from '../../../app/services/meetingsApi.ts';
import { useGetMeQuery } from '../../../app/services/authApi.ts';
import { useAppSelector } from '../../../app/hooks.ts';

interface MeetingFormModalProps {
  open: boolean;
  onClose: VoidFunction;
  defaultData?: Meeting;
}

export interface MeetingFormData {
  title: string;
  description: string;
  users: number[];
  startedAt: string;
  endedAt: string;
  eventDetails: string[];
  additionalLinks: string[];
}

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    minWidth: 500,
  },
});

const initValues: MeetingFormData = {
  title: '',
  description: '',
  users: [],
  startedAt: '',
  endedAt: '',
  eventDetails: [],
  additionalLinks: [],
};

const requiredMessage = 'Это значение является обязательным';

const formSchema = yup.object().shape({
  title: yup.string().required(requiredMessage),
  description: yup.string().required(requiredMessage),
  users: yup.array().of(yup.number().required()).default([]),
  startedAt: yup.string().required(requiredMessage),
  endedAt: yup.string().required(requiredMessage),
  eventDetails: yup
    .array()
    .of(yup.string().required(requiredMessage))
    .default([]),
  additionalLinks: yup
    .array()
    .of(yup.string().required(requiredMessage))
    .default([]),
});

const MeetingFormModal: FC<MeetingFormModalProps> = ({
  open,
  onClose,
  defaultData,
}) => {
  const defaultValues = defaultData
    ? {
        title: defaultData.title,
        description: defaultData.description,
        users: defaultData.users.map((user) => user.id),
      }
    : initValues;

  const form = useForm<MeetingFormData>({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const [addMeeting, { isLoading: isSubmitting }] = useAddMeetingMutation();

  const token = useAppSelector((state) => state.auth.token);

  const { data } = useGetMeQuery(null, {
    skip: !token,
  });

  const onSubmit = async (formData: MeetingFormData) => {
    const { users, ...other } = formData;

    await addMeeting({
      ...other,
      usersIds: users,
      ownerId: data?.id as number,
    }).unwrap();

    form.reset();
    onClose();
  };

  const { data: users, isLoading } = useGetUsersQuery(null);

  return (
    <StyledDialog scroll="body" open={open} onClose={onClose}>
      <DialogTitle textAlign="center">
        {defaultData ? 'Редактировать встречу' : 'Создать встречу'}
      </DialogTitle>
      <DialogContent>
        {isLoading || isSubmitting ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <RHForm form={form} onSubmit={form.handleSubmit(onSubmit)}>
            <Stack my={2} spacing={2}>
              <RHFTextField name="title" label="Название встречи" />
              <RHFTextField
                name="description"
                multiline
                rows={2}
                label="Описание"
              />
              <UsersField
                users={users?.filter((user) => user.isApproved) || []}
              />
              <DateTimeFields />
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={onClose}>
                  Отмена
                </Button>
                <Button type="submit" variant="contained">
                  Создать
                </Button>
              </Stack>
            </Stack>
          </RHForm>
        )}
      </DialogContent>
    </StyledDialog>
  );
};

export default MeetingFormModal;
