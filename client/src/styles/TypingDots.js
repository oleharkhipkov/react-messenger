import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  messageBubbleLeft: theme.messageBubbleLeft,
  dot: {
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    background: '#fff',
    display: 'block',
    float: 'left',
    margin: '0 0 0 8px',
  },
}));
