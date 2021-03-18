import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 12,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  landing: {
    buttonHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexDirection: 'column',
      bgcolor: 'background.paper',
      minHeight: '100vh',
      paddingTop: 23,
    },
    label: { fontSize: 19, color: 'rgb(0,0,0,0.4)', paddingLeft: '5px' },
    inputs: {
      marginTop: '.8rem',
      height: '2rem',
      padding: '5px',
    },
  },
});
