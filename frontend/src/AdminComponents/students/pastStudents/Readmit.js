import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";

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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({
  open,
  setOpen,
  user,
  onSubmit,
  classes,
  classID,
  setclass,
  loading,
}) {
  const { register, handleSubmit, errors } = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Re admit student {user} to the school
        </DialogTitle>
        <form action="">
          <div className="m-5">
            <label htmlFor="">Select Class</label>
            <select
              ref={register({ required: true })}
              value={classID}
              onChange={(e) => setclass(e.target.value)}
              name="class"
              className="form-select"
              aria-label="Default select example"
            >
              <option defaultValue hidden>
                select
              </option>
              {classes.length > 0 ? (
                classes.map((e) => (
                  <option key={e.classCode} value={e.classCode}>
                    {e.name}
                  </option>
                ))
              ) : (
                <option disabled>No data yet</option>
              )}
            </select>
            {errors.percentage && (
              <div className="text-danger mb-3">This field is required.</div>
            )}
          </div>
          <DialogActions>
            <Button
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
              color="primary"
            >
              Save changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
