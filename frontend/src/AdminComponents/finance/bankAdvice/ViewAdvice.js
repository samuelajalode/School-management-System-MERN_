import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

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
  salutations,
  subject,
  month,
  year,
  staff,
  body,
  author,
  salary,
  currentCurrency,
}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = () => {
    window.print();
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
            Staff Bank Advice Report
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
      <div className="mt-3 p-5" id="section-to-print">
        <h5>
          <strong>{salutations}</strong>
        </h5>
        <h4 className="text-underline">RE: {subject}</h4>
        <h6>
          {month} {year}
        </h6>
        <table className="table table-bordered my-5">
          <thead>
            <tr>
              <th scope="col">Staff Name</th>
              <th scope="col">Account Number</th>
              <th scope="col">Net Salary ({currentCurrency()})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{staff.name}</td>
              <td>{staff.accountNumber}</td>
              <td>{salary}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <p>{body}</p>
        </div>
        <div>{author}</div>
      </div>
      {staff && (
        <div className="m-5">
          <button onClick={handlePrint} className="btn blue__btn">
            Print Report
          </button>
        </div>
      )}
    </Dialog>
  );
}
