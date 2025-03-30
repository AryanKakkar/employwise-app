import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A237E',
      light: '#534BAE',
      dark: '#000051'
    },
    secondary: {
      main: '#1976D2'
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1A237E',
      secondary: '#1976D2'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1A237E 0%, #1976D2 100%)',
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1A237E 0%, #1976D2 100%)!important'
        }
      }
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", sans-serif',
    h6: {
      fontWeight: 600,
      letterSpacing: '0.5px'
    }
  }
});

export default theme;