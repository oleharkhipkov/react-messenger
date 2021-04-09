import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  notificationBadge: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '20px',
    minWidth: '20px',
    color: '#fff',
    backgroundColor: '#3a8dff',
    borderRadius: '50%',
    fontSize: '10px',
    padding: '2px',
    marginLeft: 'auto',
    marginRight: '30px',
  },
}));
