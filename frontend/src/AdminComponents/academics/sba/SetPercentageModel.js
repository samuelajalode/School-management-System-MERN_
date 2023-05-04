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
  examPercentage,
  setexamPercentage,
  classWorkPercentage,
  setclassWorkPercentage,
  onSubmit,
  classID,
  loading,
}) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const handleClose = () => {
    console.log("ndhou");
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
            Set Percentages for Class {classID}
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
        <div className="mb-3">
          <label className="form-label">Set ClassWork %</label>
          <input
            value={classWorkPercentage}
            ref={register({ min: 0, max: 100 })}
            onChange={(e) => setclassWorkPercentage(e.target.value)}
            type="number"
            className="form-control col-sm-6"
            name="a1"
          />
        </div>
        <div className="mb-5">
          <label className="form-label">Exam %</label>
          <input
            value={examPercentage}
            ref={register({ min: 0, max: 100 })}
            onChange={(e) => setexamPercentage(e.target.value)}
            type="number"
            className="form-control col-6"
            name="exams"
          />
        </div>
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
            Save Changes
          </button>
        </div>
      </form>
    </Dialog>
  );
}
