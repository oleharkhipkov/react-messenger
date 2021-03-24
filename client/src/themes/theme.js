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
  search: {
    searchResultItem: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #d6d6d6',
      borderLeft: '1px solid #d6d6d6',
      borderRight: '1px solid #d6d6d6',
      padding: '14px',
      paddingLeft: '10px',
      fontWeight: 'bold',
      background: '#fff',
      boxShadow: '-1px 0px 6px 0 rgba(0, 0, 0, 0.1)',
      '&:hover': { backgroundColor: '#F8F8F8' },
    },
  },
});
