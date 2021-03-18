import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  buttonHeader: theme.landing.buttonHeader,
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: theme.landing.label,
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: '10px',
    width: '160px',
    height: '56px',
    borderRadius: '3px',
    marginTop: '49px',
    fontSize: '16px',
    backgroundColor: '#3a8dff',
    fontWeight: 'bold',
  },
  inputs: theme.landing.inputs,
}));
