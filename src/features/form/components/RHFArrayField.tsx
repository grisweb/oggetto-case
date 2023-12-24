import { FC, useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { Add } from '@mui/icons-material';

type RHFArrayFieldProps = TextFieldProps & {
  name: string;
};

const RHFArrayField: FC<RHFArrayFieldProps> = ({ name, ...other }) => {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      <Button onClick={() => append('')}>Добавить ссылку</Button>
      {fields.map((field, index) => (
        <TextField
          {...other}
          key={field.id}
          {...register(`test.${index}.value`)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {index ? (
                  <IconButton onClick={() => append(fields.length - 1)}>
                    <Add />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => remove(index)}>
                    <Add />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      ))}
    </>
  );
};

export default RHFArrayField;
