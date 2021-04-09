import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 12,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 650,
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
      paddingTop: '23px',
    },
    label: { fontSize: '19px', color: 'rgb(0,0,0,0.4)', paddingLeft: '5px' },
    inputs: {
      marginTop: '13px',
      height: '32px',
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
  messageBubbleLeft: {
    padding: '10px',
    color: '#fff',
    borderRadius: '0 10px 10px 10px',
    marginTop: '4px',
    marginBottom: '16px',
    display: 'inline-block',
    backgroundImage: 'linear-gradient(225deg, #6cc1ff 0%, #3a8dff 100%)',
    textAlign: 'left',
  },
});
