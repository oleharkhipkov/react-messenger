import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    padding: '0px 16px',
    display: 'flex',
    flexDirection: 'column',
    height: '95vh',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
    },
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '70px',
    padding: '0px 20px 0px 10px',
    alignItems: 'center',
  },
  headingText: {
    fontSize: '20px',
    letterSpacing: '-0.29px',
    marginBlockEnd: '13px',
    marginBlockStart: '13px',
  },
}));
