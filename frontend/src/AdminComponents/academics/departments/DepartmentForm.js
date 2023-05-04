import React from "react";
import { useForm } from "react-hook-form";
//mport axios from "../../../store/axios";
import { withStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function CourseForm(props) {
  const { register, handleSubmit, errors } = useForm();
  let {
    name,
    setname,
    description,
    setdescription,
    setOpen,
    open,
    onSubmit,
    loading,
    isEdit,
  } = props;

  const handleClose = () => {
    setOpen(false);
    setdescription("");
    setname("");
  };

  return (
    <Dialog
      onClose={handleClose}
      maxWidth="sm"
      fullWidth={true}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {isEdit ? "Edit Division" : "Add New Division"}
      </DialogTitle>
      <DialogContent>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label"> Name</label>
            <input
              type="text"
              value={name}
              ref={register({ required: true })}
              onChange={(e) => setname(e.target.value)}
              className="form-control"
              name="name"
            />
            {errors.name && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              type="text"
              value={description}
              ref={register({ required: true })}
              onChange={(e) => setdescription(e.target.value)}
              className="form-control"
              name="description"
            />
            {errors.description && (
              <span className="form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
          <div className="">
            <button disabled={loading} type="submit" className="btn blue__btn">
              {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {isEdit ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CourseForm;
