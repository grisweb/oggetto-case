import { FC, ReactNode } from 'react';
import { Box, Divider, Typography } from '@mui/material';

interface BodyHeaderProps {
  title: string;
  actions?: ReactNode;
}

const BodyHeader: FC<BodyHeaderProps> = ({ title, actions }) => {
  return (
    <>
      <Box display="flex" alignItems="center" padding={4}>
        <Typography variant="h5" fontWeight={500}>
          {title}
        </Typography>
        <Box marginLeft="auto">{actions}</Box>
      </Box>
      <Divider />
    </>
  );
};

export default BodyHeader;
