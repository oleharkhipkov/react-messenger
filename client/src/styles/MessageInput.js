import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  form: {
    padding: '0 48px',
    marginBottom: '56px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '32px',
      padding: '0rem',
    },
  },
  recordIcon: { marginRight: '12px' },
  messageInput: {
    height: '70px',
    borderRadius: '8px',
    backgroundColor: '#f4f6fa',
    display: 'flex',
    paddingLeft: '20px',
    alignItems: 'center',
    width: '100%',
  },
  messageIcons: {
    display: 'flex',
    color: '#d1d9e6',
    marginRight: '10px',
  },
}));
