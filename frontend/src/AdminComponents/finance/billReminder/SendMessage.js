import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";

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

export default function FullScreenDialog({ open, setOpen, debtors }) {
  const classes = useStyles();
  const sender = useSelector(selectUser);
  const [message, setmessage] = useState(
    "Dear parent, please be reminded that your ward {student_name} owes an amount of {amount_owed}. Please pay as soon as possible."
  );
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onSend = (e) => {
    e.preventDefault();
    setloading(true);
    if (message) {
      debtors.map(async (d) => {
        if (!d?.telephone || !d?.mobilenumber) {
          setloading(false);
          return errorAlert(`user ${d.userID} does not have phone number`);
        }
        await axios
          .post(`/chats`, {
            message,
            telephone: d?.telephone || d?.mobilenumber,
            sender: sender?.id,
            userID: d.userID,
          })
          .then((res) => {
            setloading(false);
            if (res.data.error) {
              return errorAlert(res.data.error);
            }
            successAlert(`message send to ${d.userID}`);
          })
          .catch((err) => {
            setloading(false);
            return errorAlert(`Failed to send to ${d.userID} `);
          });
      });
    }
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
            Sound
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
      <div className="m-5">
        <form action="" className=" content__container form__sender">
          <div className="header">
            <h3>Send Message to {debtors?.length || 0} debtor(s)</h3>
          </div>
          <div className="row mb-2 px-3">
            <label className="col-sm-2" htmlFor="">
              Sender:
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                value={sender?.name}
                type="text"
                readOnly
              />
            </div>
          </div>
          <div className="mb-2 row">
            <div className="col-12">
              <textarea
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                className="form-control"
                name=""
                rows="10"
                placeholder="Type here"
              ></textarea>
            </div>
            <div className="col-12">
              <button
                disabled={loading}
                onClick={onSend}
                className="btn blue__btn w-100"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
