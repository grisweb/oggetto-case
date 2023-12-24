import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

import RHFDateTimeField from '../../form/components/RHFDateTimeField.tsx';
import { MeetingFormData } from './MeetingFormModal.tsx';

const DateTimeFields: FC = () => {
  const { watch } = useFormContext<MeetingFormData>();

  const startedAt = watch('startedAt');

  return (
    <>
      <RHFDateTimeField
        name="startedAt"
        label="Начало встречи"
        minDateTime={dayjs()}
      />
      {startedAt && (
        <RHFDateTimeField
          name="endedAt"
          label="Конец встречи"
          minDateTime={dayjs(startedAt)}
        />
      )}
    </>
  );
};

export default DateTimeFields;
