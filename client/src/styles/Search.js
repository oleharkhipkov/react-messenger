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
  searchResultItem: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #d6d6d6',
    borderLeft: '1px solid #d6d6d6',
    borderRight: '1px solid #d6d6d6',
    padding: '14px',
    paddingLeft: '10px',
    fontWeight: 'bold',
    background: '#fff',
    boxShadow: '-1px 0px 6px 0 rgba(0, 0, 0, 0.1)',
    '&:hover': { backgroundColor: '#F8F8F8' },
  },
  searchResultItemText: {
    marginLeft: '16px',
  },
}));
