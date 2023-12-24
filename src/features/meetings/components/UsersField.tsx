import { FC } from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { User } from '../../../app/types.ts';
import { MeetingFormData } from './MeetingFormModal.tsx';

interface UsersFieldOptions {
  users: User[];
}

const UsersField: FC<UsersFieldOptions> = ({ users }) => {
  const { setValue } = useFormContext<MeetingFormData>();

  const handleChange = (_: unknown, value: User[]) => {
    setValue(
      'users',
      value.map((user) => user.id),
    );
  };

  return (
    <Autocomplete
      multiple
      options={users || []}
      noOptionsText="Пользователи отсутствуют"
      onChange={handleChange}
      getOptionLabel={(option) => option.fullName + option.email}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={params.InputProps.ref}
          label="Введите ФИО или email"
          fullWidth
          variant="outlined"
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" marginRight="8px">
              {option.fullName}
            </Typography>
            <Typography variant="body2">({option.email})</Typography>
          </Box>
        </li>
      )}
    />
  );
};

export default UsersField;
