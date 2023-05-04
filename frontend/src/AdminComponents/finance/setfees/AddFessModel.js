import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
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




export default function CustomizedDialogs({name, setname, open, setOpen, loading, onSubmit}) {
  const { register, handleSubmit, errors } = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Add New Fees Type
        </DialogTitle>
        <DialogContent dividers>
            <form action="">
                    <div className="row mb-2">
                        <label className="col-12 form-label">Fees Name</label>
                        <div className="col-12">
                            <input  
                             ref={register({ required: true })} 
                            value={name} 
                            onChange={e => setname(e.target.value)}
                            type="type" 
                            className="form-control" 
                            name="fees" />
                        </div>
                        {errors.fees && <span className=" form-error text-danger mb-2">This field is required</span>}
                    </div>
                    <div className=" md-3">
                        <button 
                        disabled={loading}
                        onClick={handleSubmit(onSubmit)} 
                        className="btn blue__btn">
                            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                            Submit
                        </button>
                   </div>
            </form>
        </DialogContent>
      </Dialog>

  );
}
