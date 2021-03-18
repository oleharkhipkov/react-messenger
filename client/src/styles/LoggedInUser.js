import { makeStyles } from '@material-ui/core/styles';
import Please from 'pleasejs';

export const useStyles = makeStyles(() => ({
  userImg: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    marginRight: '10px',
    backgroundColor: Please.make_color(),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: '20px',
  },
}));
