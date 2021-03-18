import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  heroText: {
    fontSize: '26px',
    textAlign: 'center',
    color: 'white',
    marginTop: '30px',
    maxWidth: '300px',
  },
  overlay: {
    backgroundImage:
      'linear-gradient(180deg, rgb(58,141,255, 0.85) 0%, rgb(134,185,255, 0.85) 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingBottom: '145px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    backgroundImage: 'url(./images/bg-img.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));
