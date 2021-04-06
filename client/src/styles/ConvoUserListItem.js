import { makeStyles, withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

export const useStyles = makeStyles(() => ({
  conversation: {
    display: 'flex',
    height: '85px',
    alignItems: 'center',
    margin: '6px 0px',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    boxSizing: 'border-box',
    cursor: 'pointer',
    '&:hover': { backgroundColor: 'rgba(88,133,196,0.05)' },
  },
  convoInfo: {
    marginLeft: '16px',
    paddingRight: '5px',
  },
  userImg: {
    minWidth: '44px',
    minHeight: '44px',
    backgroundColor: 'lightGray',
    color: 'black',
    textTransform: 'uppercase',
  },
  username: {
    fontSize: '14px',
  },
  mostRecentMessage: {
    fontSize: '12px',
    color: '#9cadc8',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
    overflow: 'hidden',
  },
  typingText: {
    fontSize: '12px',
    fontStyle: 'italic',
  },
}));

export const StyledBadge = withStyles((props) => ({
  badge: {
    color: (props) => props.color,
    backgroundColor: (props) => props.color,
    border: '2px solid white',
    height: '14px',
    width: '14px',
    borderRadius: '50%',
  },
}))(Badge);
