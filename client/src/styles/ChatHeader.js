import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  chatHeader: {
    backgroundColor: '#fff',
    minHeight: '70px',
    boxShadow: '0 2px 20px 0 rgba(88,133,196,0.10)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '24px',
    paddingRight: '56px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userUsername: {
    fontFamily: 'Open Sans',
    fontSize: '20px',
    color: '#000000',
    letterSpacing: '-0.29px',
  },
  userStatus: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '12px',
    marginTop: '4px',
  },
  status: {
    height: '8px',
    width: '8px',
    borderRadius: '50%',
    backgroundColor: '#1CED84',
    display: 'flex',
    marginRight: '4px',
  },
}));
