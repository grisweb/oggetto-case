import { FC } from 'react';
import { Box, Drawer, useTheme } from '@mui/material';
import MenuList from './MenuList.tsx';
import { useAppSelector } from '../../../app/hooks.ts';

export const DRAWER_WIDTH = 220;

const Sidebar: FC = () => {
  const theme = useTheme();

  const sidebarOpened = useAppSelector((state) => state.layout.sidebarOpened);

  const drawerWidth = sidebarOpened ? DRAWER_WIDTH : 0;

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: 0,
        width: drawerWidth,
      }}
    >
      <Drawer
        open={sidebarOpened}
        container={window.document.body}
        variant="persistent"
        anchor="left"
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            top: '80px',
            whiteSpace: 'nowrap',
          },
        }}
      >
        <MenuList />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
