import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  chat: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
    padding: '32px 48px',
    [theme.breakpoints.down('xs')]: {
      padding: '16px 16px',
    },
  },
}));
