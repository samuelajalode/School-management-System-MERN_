import React from "react";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function EditPrefects({
  open,
  setopen,
  name,
  position,
  setname,
  setposition,
  loading,
  endYear,
  yearOptions,
  setendYear,
  userID,
  setuserID,
  onEdit,
}) {
  const { register, handleSubmit, errors, reset } = useForm();

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      onClose={() => setopen(false)}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={() => setopen(false)}>
        Edit Prefect Details
      </DialogTitle>
      <DialogContent dividers>
        <form action="">
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Name</label>
            <div className="col-sm-9">
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
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Student ID</label>
            <div className="col-sm-9">
              <input
                type="text"
                ref={register({ required: true })}
                className="form-control"
                value={userID}
                onChange={(e) => setuserID(e.target.value)}
                name="userId"
              />
              {errors.userId && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">Position</label>
            <div className="col-sm-9">
              <select
                ref={register({ required: true })}
                name="position"
                value={position}
                onChange={(e) => setposition(e.target.value)}
                className="form-select"
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                <option value="Headgirl">Head Girl</option>
                <option value="Headboy">Head Boy</option>
                <option value="Vice Headgirl">Vice Headgirl</option>
                <option value="Vice Headboy">Vice Headboy</option>
                <option value="Senior Prefect">Senior Prefect</option>
                <option value="Prefect">Prefect </option>
                <option value="other">Other </option>
              </select>
              {errors.position && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label">To Year</label>
            <div className="col-sm-9">
              <select
                name="end_year"
                value={endYear}
                onChange={(e) => setendYear(e.target.value)}
                className="form-select"
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                {yearOptions &&
                  yearOptions.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
              </select>
              {errors.start_year && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="offset-sm-3">
              <button
                disabled={loading}
                onClick={handleSubmit(onEdit)}
                className="btn blue__btn "
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Add
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setopen(false);
                }}
                className="btn btn-danger ml-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditPrefects;
