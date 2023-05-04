import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


function DeleteFeesModal({ open , setOpen, handleDelete, loading}) {
 
  const handleClose = () => {
    setOpen(false);
  };

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button disabled={loading} onClick={handleDelete} color="primary" autoFocus>
                    {loading &&  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
    )
}

export default DeleteFeesModal
