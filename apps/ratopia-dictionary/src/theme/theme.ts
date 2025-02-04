import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B0000', // Темно-красный
    },
    secondary: {
      main: '#FFD700', // Золотой
    },
    background: {
      default: '#2F2F2F', // Темно-коричневый/черный
      paper: 'black'
    },
    text: {
      primary: '#FFFFFF', // Белый цвет для текста на темном фоне
      //secondary: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Выберите шрифт по вашему вкусу
  },
});

export default theme;