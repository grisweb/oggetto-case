import { FC, useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';

import googleIcon from '../../../assets/img/social-google.svg';
import {
  useGetMeQuery,
  useLoginMutation,
} from '../../../app/services/authApi.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { setToken } from '../authSlice.ts';

interface LoginModalProps {
  open: boolean;
  onClose: VoidFunction;
}

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    minWidth: 400,
    minHeight: 200,
  },
  '& .MuiDialogContent-root': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

const LoginModal: FC<LoginModalProps> = ({ open, onClose }) => {
  const [authorize] = useLoginMutation();

  const [isNotApproved, setIsNotApproved] = useState(false);

  const googleApi = 'https://www.googleapis.com';

  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const { isLoading, data } = useGetMeQuery(null, {
    skip: !token,
  });

  useEffect(() => {
    if (data && !data.isApproved) {
      setIsNotApproved(true);
      dispatch(setToken(null));
    }

    if (data && data.isApproved) {
      onClose();
    }
  }, [data, dispatch, onClose]);

  const login = useGoogleLogin({
    scope: `email ${googleApi}/auth/calendar.events ${googleApi}/auth/calendar`,
    onSuccess: ({ access_token }) => {
      authorize({
        accessToken: access_token,
        clientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
      });
    },
  });

  const theme = useTheme();

  const handleClick = () => {
    login();
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">Войти</DialogTitle>
      <DialogContent>
        <Box>
          {isNotApproved ? (
            <Typography variant="subtitle2">
              Вы не добавлены в систему. Дождитесь подтверждения администратора
            </Typography>
          ) : (
            <>
              {isLoading && <CircularProgress size="small" />}
              {!token && (
                <Button
                  disableElevation
                  fullWidth
                  onClick={handleClick}
                  size="large"
                  variant="outlined"
                  sx={{
                    color: 'grey.700',
                    backgroundColor: theme.palette.grey[200],
                    borderColor: theme.palette.grey[100],
                  }}
                >
                  <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                    <img
                      src={googleIcon}
                      alt="google"
                      width={16}
                      height={16}
                      style={{ marginRight: 16, display: 'block' }}
                    />
                  </Box>
                  Войти с Google
                </Button>
              )}
            </>
          )}
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default LoginModal;
