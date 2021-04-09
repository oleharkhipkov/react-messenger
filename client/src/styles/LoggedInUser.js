import { makeStyles, withStyles } from '@material-ui/core/styles';
import Please from 'pleasejs';
import Badge from '@material-ui/core/Badge';

export const useStyles = makeStyles(() => ({
  userImg: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: Please.make_color(),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  username: {
    fontSize: '20px',
    marginLeft: '10px',
  },
}));

export const StyledBadge = withStyles((props) => ({
  badge: {
    backgroundColor: (props) => props.color,
    color: (props) => props.color,
    border: '2px solid white',
    height: '14px',
    width: '14px',
    borderRadius: '50%',
  },
}))(Badge);
