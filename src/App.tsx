import { FC } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ruRU } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'dayjs/locale/ru';

import theme from './features/layout/theme.ts';
import { store } from './app/store.ts';
import router from './app/router.tsx';

const russianLocale =
  ruRU.components.MuiLocalizationProvider.defaultProps.localeText;

const App: FC = () => {
  return (
    <Provider store={store}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ru"
        localeText={russianLocale}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
          >
            <RouterProvider router={router} />
          </GoogleOAuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
};

export default App;
