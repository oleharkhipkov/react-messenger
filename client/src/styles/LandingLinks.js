import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  acctLinks: {
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center',
    },
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  accBtn: {
    width: 170,
    height: 54,
    borderRadius: 5,
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: '#ffffff',
    color: '#3a8dff',
    boxShadow: 'none',
    marginRight: 35,
    [theme.breakpoints.down('xs')]: {
      marginRight: '0px',
      width: '100%',
    },
  },
  noAccBtn: {
    fontSize: 14,
    color: '#b0b0b0',
    fontWeight: 400,
    textAlign: 'center',
    marginRight: 21,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      marginRight: '0px',
      marginBottom: '12px',
    },
  },
}));
