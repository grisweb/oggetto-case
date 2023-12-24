import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Box } from '@mui/material';

type RHFTextFieldProps = DateTimePickerProps<dayjs.Dayjs> & { name: string };

const RHFDateTimeField: FC<RHFTextFieldProps> = ({ name, ...other }) => {
  const { control, setValue } = useFormContext();

  const handleChange = (value: dayjs.Dayjs | null) => {
    setValue(name, value ? value.toISOString() : '');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box>
          <DateTimePicker<dayjs.Dayjs>
            {...other}
            onChange={handleChange}
            value={dayjs(field.value)}
            disablePast
            slotProps={{
              textField: {
                error: !!error,
                fullWidth: true,
                helperText: error?.message,
                inputRef: field.ref,
              },
            }}
          />
        </Box>
      )}
    />
  );
};

export default RHFDateTimeField;
