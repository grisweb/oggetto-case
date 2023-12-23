import { FC } from 'react';
import { Box, Divider, Typography } from '@mui/material';

interface BodyHeaderProps {
  title: string;
}

const BodyHeader: FC<BodyHeaderProps> = ({ title }) => {
  return (
    <>
      <Box padding={4}>
        <Typography variant="h5" fontWeight={500}>
          {title}
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

export default BodyHeader;
