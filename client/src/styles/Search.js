import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  search: {
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ffffff',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid white',
    },
  },
  searchInput: {
    minHeight: '50px',
    borderRadius: '8px',
    backgroundColor: '#e9eef9',
    display: 'flex',
    paddingLeft: '20px',
    alignItems: 'center',
    position: 'relative',
  },
  searchIcon: {
    color: '#b1c3df',
    marginRight: '6px',
  },
  searchResultsContainer: {
    position: 'absolute',
    zIndex: '2',
    width: '100%',
  },
}));
