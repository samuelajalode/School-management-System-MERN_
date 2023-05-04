import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({open, setOpen, setname, name, handleEdit , loading}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullWidth={true} maxWidth="sm" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
           Edit School Name
        </DialogTitle>
        <DialogContent >
               <div className="row mb-3">
                    <div className="col-sm-9">
                       <input 
                        onChange={e => setname(e.target.value)} 
                        value={name} 
                        type="text" 
                        className="form-control" 
                        name="name"/>
                    </div>
                </div>
        </DialogContent>
        <DialogActions>
          <Button 
            disabled={loading} 
            autoFocus 
            onClick={handleEdit} 
            color="primary">
                 {loading &&   <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
            Save changes
          </Button>
          <Button 
            autoFocus 
            onClick={handleClose} 
            color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
