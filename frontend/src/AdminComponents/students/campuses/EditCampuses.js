import React from 'react'
import CampusForm from './CampusForm'
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';



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
  

function EditCampuses({open, setopen, name, location , setname, setlocation, onSubmit, loading}) {

    return (
             <Dialog 
             fullWidth={true}
             maxWidth="sm"
             onClose={() => setopen(false)} 
             aria-labelledby="customized-dialog-title" 
             open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={() => setopen(false)}>
                    Edit Campus
                    </DialogTitle>
                    <DialogContent dividers>
                        <CampusForm 
                        name={name} 
                        isEdit={true}
                        location={location} 
                        setname={setname} 
                        setlocation={setlocation} 
                        onSubmit={onSubmit} 
                        loading={loading}/>
                    </DialogContent>

                </Dialog>
    )
}

export default EditCampuses
