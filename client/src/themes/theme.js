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
