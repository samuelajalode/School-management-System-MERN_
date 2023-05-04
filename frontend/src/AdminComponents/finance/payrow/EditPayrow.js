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
import { useForm } from 'react-hook-form';

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

export default function CustomizedDialogs({
    open, setOpen, 
    name, salary,
    allowance, bonus, 
    setname,
    setsalary,
    isAdd,
    loading,
    onSubmit,
    setallowance,
    setbonus
  }) {

    const { register, handleSubmit, errors } = useForm()


  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog 
      onClose={handleClose} 
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="customized-dialog-title" 
      open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {isAdd ? " Add New Staff Position" : "Edit Staff Position"}
           
        </DialogTitle>
        <form action="">
        <DialogContent >
              <div className="mb-3">
                <label htmlFor="">Position's Name</label>
                {isAdd ? 
                <>
                   <input 
                    ref={register({ required: true })}
                    type="text" 
                    name="name"
                    value={name}
                    onChange={e => setname(e.target.value)}
                    className="form-control"  
                    />
                    {errors.name && <div className="text-danger mb-3">This field  is required.</div>}
                </> : 
                   <input 
                   ref={register({ required: true })}
                   type="text" 
                   name="name"
                   value={name}
                   readOnly
                   className="form-control"  
                   />
                }
               
               </div>
               <div className="mb-3">
                <label htmlFor="">Salary</label>
                <input 
                    ref={register({ required: true })}
                    type="number" 
                    name="salary"
                    value={salary}
                    onChange={e => setsalary(e.target.value)}
                    className="form-control"  
                    />
                    {errors.salary && <div className="text-danger mb-3">This field  is required.</div>}
               </div>
               <div className="mb-3">
                <label htmlFor="">Allowance</label>
                <input 
                    ref={register({ required: true })}
                    type="number" 
                    name="allowance"
                    value={allowance}
                    onChange={e => setallowance(e.target.value)}
                    className="form-control"  
                    />
                    {errors.allowance && <div className="text-danger mb-3">This field  is required.</div>}
               </div>
               <div className="mb-3">
                <label htmlFor="">Bonus</label>
                <input 
                    ref={register({ required: true })}
                    type="number" 
                    name="bonus"
                    value={bonus}
                    onChange={e => setbonus(e.target.value)}
                    className="form-control"  
                    />
                    {errors.bonus && <div className="text-danger mb-3">This field  is required.</div>}
               </div>
            </DialogContent>
            <DialogActions>
                <Button 
                disabled={loading} 
                onClick={handleSubmit(onSubmit)} 
                color="primary">
                    {loading && 
                        <div 
                        className="spinner-border spinner-border-sm" 
                        role="status">
                        </div>
                    }
                    {isAdd ? "Add" : "Save Changes"}
                </Button>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
           </DialogActions>
           </form>
      </Dialog>
  );
}
