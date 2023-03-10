import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  noMessages: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  noMessagesHeading: {
    fontSize: '22px',
  },
}));

