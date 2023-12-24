import { FC, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { Menu, Login } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { toggleSidebar } from '../layoutSlice.ts';
import LoginModal from '../../auth/components/LoginModal.tsx';
import { useGetMeQuery } from '../../../app/services/authApi.ts';

import oggettoLogo from '../../../assets/img/oggetto-logo.png';

const LogoWrapper = styled(Box)({
  width: 60,
  marginLeft: 16,
  '& img': {
    display: 'block',
    width: '100%',
  },
});

const Header: FC = () => {
  const [openLogin, setOpenLogin] = useState(false);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleSidebar());
  };

  const token = useAppSelector((state) => state.auth.token);

  const { data, isLoading } = useGetMeQuery(null, {
    skip: !token,
  });

  const handleClickLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <>
      {/*{data && data.isApproved && (*/}
      {/*  <Fab size="small" color="default" onClick={handleClick}>*/}
      {/*    <Menu />*/}
      {/*  </Fab>*/}
      {/*)}*/}
      {
        <IconButton size="large" color="primary" onClick={handleClick}>
          <Menu />
        </IconButton>
      }
      <LogoWrapper>
        <img src={oggettoLogo} alt="Oggetto logo" />
      </LogoWrapper>
      <Typography variant="subtitle1" fontSize="1.2rem">
        Well-being events
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      {isLoading ? (
        <Avatar>
          <CircularProgress />
        </Avatar>
      ) : (
        <>
          {data && data.isApproved ? (
            <Avatar src={data.photoUrl} alt="Avatar" />
          ) : (
            <Box mr={1}>
              <Button onClick={handleClickLogin}>
                <Login fontSize="small" sx={{ mr: 1 }} />
                <Typography lineHeight="1" variant="subtitle2">
                  Войти
                </Typography>
              </Button>
            </Box>
          )}
        </>
      )}
      <LoginModal open={openLogin} onClose={handleCloseLogin} />
    </>
  );
};

export default Header;
