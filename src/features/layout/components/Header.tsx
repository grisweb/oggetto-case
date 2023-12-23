import { FC, useState } from 'react';
import { Avatar, Box, CircularProgress, Fab, Typography } from '@mui/material';
import { Menu, Login } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { toggleSidebar } from '../layoutSlice.ts';
import LoginModal from '../../auth/components/LoginModal.tsx';
import { useGetMeQuery } from '../../../app/services/authApi.ts';

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
      {data && data.isApproved && (
        <Fab size="small" color="default" onClick={handleClick}>
          <Menu />
        </Fab>
      )}
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
            <Fab size="small" variant="extended" onClick={handleClickLogin}>
              <Login fontSize="small" sx={{ mr: 1 }} />
              <Typography lineHeight="1" variant="subtitle2">
                Войти
              </Typography>
            </Fab>
          )}
        </>
      )}
      <LoginModal open={openLogin} onClose={handleCloseLogin} />
    </>
  );
};

export default Header;
