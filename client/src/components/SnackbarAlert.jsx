import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

const SnackbarAlert = ({ error, showError, setShowError }) => {
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setShowError(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={showError}
      autoHideDuration={6000}
      onClose={handleClose}
      message={error ? error : null}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default SnackbarAlert;

// import React from 'react';
// import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';

// const LandingSnackbar = ({ open, handleClose, error }) => {
//   return (
//     <Snackbar
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'center',
//       }}
//       open={open}
//       autoHideDuration={6000}
//       onClose={handleClose}
//       message={error ? error : null}
//       action={
//         <React.Fragment>
//           <IconButton
//             size="small"
//             aria-label="close"
//             color="inherit"
//             onClick={handleClose}
//           >
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         </React.Fragment>
//       }
//     />
//   );
// };

// export default LandingSnackbar;
