import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import moment from "moment";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
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
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
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

export default function CustomizedDialogs({
  open,
  setOpen,
  handleDelete,
  editData,
}) {
  const { register, handleSubmit, errors } = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        maxWidth="sm"
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Notice
        </DialogTitle>

        <DialogContent dividers>
          <form className="row" action="">
            <div className="col-md-6 mb-5">
              <label className="form-label">Title</label>
              <input
                type="text"
                ref={register({ required: true })}
                value={editData?.title}
                onChange={(e) => editData?.settitle(e.target.value)}
                className="form-control py-4"
                name="title"
              />
              {errors.title && (
                <div className="text-danger">This field is required</div>
              )}
            </div>
            <div className="col-md-6 mb-5">
              <label className="form-label">Date</label>
              <input
                type="date"
                value={moment(editData?.date).format("YYYY-MM-D")}
                ref={register({ required: true })}
                onChange={(e) => editData?.setdate(e.target.value)}
                className="form-control py-4"
                name="date"
              />
              {errors.date && (
                <div className="text-danger">This field is required</div>
              )}
            </div>
            <div className="col-md-12 mb-5">
              <label className="form-label">Description</label>
              <textarea
                value={editData?.description}
                onChange={(e) => editData?.setdescription(e.target.value)}
                rows={5}
                className="form-control"
                name="description"
              />
            </div>
            <div className="col-md-6 mb-5">
              <label className="form-label">Created By</label>
              <input
                type="text"
                ref={register({ required: true })}
                value={editData?.createdby}
                onChange={(e) => editData?.setcreatedby(e.target.value)}
                className="form-control  py-4"
                name="createdby"
              />
            </div>
            <div className="row">
              <div className="col-4">
                <button
                  disabled={editData?.loading}
                  onClick={handleSubmit(editData?.handleCreate)}
                  className="btn blue__btn"
                >
                  Save Changes
                </button>
              </div>
              <div className="col-4">
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
