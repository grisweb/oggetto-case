import { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/material';

const BodyHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box padding={4} height="100%" position="relative" flexGrow={1}>
      {children}
    </Box>
  );
};

export default BodyHeader;
