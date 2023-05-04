import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  setOpen,
  name,
  userID,
  exam,
  setexam,
  classWork,
  setclassWork,
  onSubmit,
  classID,
  loading,
  position,
  setposition,
  classworkMark,
  examMark,
}) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const handleClose = () => {
    setposition("");
    setclassWork("");
    setexam("");
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar color="transparent" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {name} - {userID}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form action="" className="m-5">
        <h3 className="mb-5">Set Grades for Class {classID} </h3>
        <div className="mb-3">
          <label className="form-label">
            Set ClassWork ( out of {Number(classworkMark || 0)})
          </label>
          <input
            value={classWork}
            ref={register({ min: 0, max: Number(classworkMark || 0) + 1 })}
            onChange={(e) => setclassWork(e.target.value)}
            type="number"
            className="form-control col-sm-6"
            name="a1"
          />
          {errors.a1 && (
            <span className=" form-error text-danger mb-2">
              out of ({Number(classworkMark || 0)}
            </span>
          )}
        </div>
        <div className="mb-5">
          <label className="form-label">
            Exam Mark (out of {Number(examMark || 0)})
          </label>
          <input
            value={exam}
            ref={register({ min: 0, max: Number(examMark || 0) + 1 })}
            onChange={(e) => setexam(e.target.value)}
            type="number"
            className="form-control col-6"
            name="exams"
          />
          {errors.exams && (
            <span className=" form-error text-danger mb-2">
              out of ({Number(examMark || 0)}
            </span>
          )}
        </div>
        {/* <div className="mb-5">
          <label className="form-label">Position</label>
          <input
            value={position}
            onChange={(e) => setposition(e.target.value)}
            type="number"
            ref={register({ min: 0 })}
            className="form-control col-6"
            name="position"
          />
          {errors.position && (
            <span className=" form-error text-danger mb-2">
              cannot be negative
            </span>
          )}
        </div> */}
        <div className="mb-3">
          <button
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            className="btn blue__btn"
          >
            {loading && (
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Submit Changes
          </button>
        </div>
      </form>
    </Dialog>
  );
}
