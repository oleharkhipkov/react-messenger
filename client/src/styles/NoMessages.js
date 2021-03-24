import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  noMessages: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
  },
  noMessagesHeading: {
    fontSize: '22px',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
  },
}));
