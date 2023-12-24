import { FC, useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

type RHFArrayFieldProps = TextFieldProps & {
  name: string;
};

const RHFArrayField: FC<RHFArrayFieldProps> = ({ name, ...other }) => {
  const { control, register } = useFormContext();

  const { fields, remove, append } = useFieldArray({
    control,
    name,
  });

  useEffect(() => {
    if (!fields.length) {
      append('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {fields.map((field, index) => (
        <TextField
          {...other}
          key={field.id}
          {...register(`${name}.${index}`)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {!index ? (
                  <IconButton onClick={() => append('')}>
                    <Add />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => remove(index)}>
                    <Remove />
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
