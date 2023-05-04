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
import { useForm } from "react-hook-form";

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




export default function EditBank(
    {loading, open,onSubmit, setOpen, bank, setbank , accountNumber, setaccountNumber}) {

  const { register, handleSubmit, errors } = useForm();


  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog 
        onClose={handleClose} 
        maxWidth="sm"
        fullWidth={true}
        aria-labelledby="customized-dialog-title" 
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
           Edit Bank Details
        </DialogTitle>
        <form action="">
            <DialogContent >
                 <div className=" mb-4">
                    <label  
                    className="col-sm-3 col-form-label">
                        Bank
                   </label>
                    <div className="col-sm-9">
                        <input 
                        type="text" 
                        value={bank}
                        ref={register({ required: true})} 
                        onChange={e => setbank(e.target.value)}
                        className="form-control" 
                        name="date"/>
                        {errors.date && <div className="text-danger">This field is required</div>}
                    </div>
                 </div>
                 <div className=" mb-4">
                    <label  
                    className="col-sm-3 col-form-label">
                        Account Number
                   </label>
                    <div className="col-sm-9">
                        <input 
                        type="text" 
                        value={accountNumber}
                        ref={register({ required: true})} 
                        onChange={e => setaccountNumber(e.target.value)}
                        className="form-control" 
                        name="date"/>
                        {errors.date && <div className="text-danger">This field is required</div>}
                    </div>
                 </div>
                
            </DialogContent>
            <DialogActions>
                <Button autoFocus 
                    color="primary"
                    disabled={loading}
                    onClick={handleSubmit(onSubmit)}
                    >
                    {loading &&  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                    Save Changes
                </Button>
                <Button autoFocus onClick={handleClose} color="secondary">
                    Close
                </Button>
            </DialogActions>
        </form>
      </Dialog>
  );
}
