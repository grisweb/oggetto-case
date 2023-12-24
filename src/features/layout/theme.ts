import { createTheme } from '@mui/material';
import createPalette from '@mui/material/styles/createPalette';
import { ruRU } from '@mui/material/locale';

const palette = createPalette({});

const theme = createTheme(
  {
    typography: {
      h5: {
        fontSize: '1.35rem',
      },
    },
    palette: {
      primary: {
        light: '#fcf267',
        main: '#ffc400',
        dark: '#ffab00',
      },
      background: {
        default: '#f7f9fc',
      },
      text: {
        primary: palette.grey['800'],
      },
    },
    shape: {
      borderRadius: 10,
    },
  },
  ruRU,
);

export default theme;
