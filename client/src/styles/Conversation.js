import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  userAvatar: {
    minWidth: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightGray',
    marginRight: '12px',
    textTransform: 'uppercase',
  },
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
  messageBubbleRight: {
    padding: '10px',
    color: '#95a7c4',
    borderRadius: '10px 10px 0px 10px',
    marginTop: '4px',
    marginBottom: '16px',
    display: 'inline-block',
    backgroundColor: '#f4f6fA',
    textAlign: 'left',
  },
  msgContentRight: {
    textAlign: 'right',
  },
  timeStamp: {
    margin: 0,
    fontSize: '11px',
    color: '#a0a0a0',
    fontWeight: 'bold',
  },
  end: {
    alignSelf: 'flex-end',
  },
}));
