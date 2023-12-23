import { FC } from 'react';
import { AppBar, Box, Paper, styled, Toolbar, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './Header.tsx';
import Sidebar, { DRAWER_WIDTH } from './Sidebar.tsx';
import { useAppSelector } from '../../../app/hooks.ts';

const Main = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.grey['100'],
  flexGrow: 1,
  borderRadius: '15px 15px 0 0',
  padding: '20px',
  marginTop: '60px',
  marginRight: '20px',
}));

const MainPaper = styled(Paper)({
  width: '100%',
  height: '100%',
  borderRadius: '15px',
});

const Layout: FC = () => {
  const theme = useTheme();

  const sidebarOpened = useAppSelector((state) => state.layout.sidebarOpened);

  const drawerWidth = sidebarOpened ? DRAWER_WIDTH : 0;

  return (
    <Box display="flex" height="100vh">
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.default,
          transition: sidebarOpened
            ? theme.transitions.create('width')
            : 'none',
        }}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Main
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: sidebarOpened ? 0 : -(drawerWidth - 20) + 'px',
          transition: theme.transitions.create(
            'margin',
            sidebarOpened
              ? {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
                }
              : {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                },
          ),
        }}
      >
        <MainPaper elevation={0}>
          <Outlet />
        </MainPaper>
      </Main>
    </Box>
  );
};

export default Layout;
