import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useForm } from "react-hook-form";
import SendMessageForm from "./SendMessageForm";
import axios from "../../../store/axios";
import moment from "moment";

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
  const [subject, setsubject] = useState("School Fees");
  const [salutations, setsalutations] = useState("Dear Parent");
  const [closing, setclosing] = useState("Yours Faithfully");
  const [message, setmessage] = useState(
    "You are reminded that your ward is owning"
  );
  const [signature, setsignature] = useState("Admin");
  const { register, handleSubmit, errors } = useForm();
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);
  const [school, setschool] = useState({});

  useEffect(() => {
    axios.get("/school").then((res) => {
      setschool(res.data);
    });
  }, []);

  const handlePrint = () => {
    setloading(true);
    setshow(true);
    window.print();
    setloading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(debtors);

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
            Bill Reminder
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
      <div className="backgroundColor m-5">
        {show ? (
          <div id="section-to-print">
            {debtors.map((res, index) => (
              <div key={index} className="content__container mb-5">
                <div className="text-center">
                  <h5>
                    <strong>{school?.fullName}</strong>
                  </h5>
                  <h6>Telephone: {school?.telephone}</h6>
                  <hr />
                </div>
                <div>
                  <div className="d-flex   justify-content-end">
                    <div>
                      <div className="">{moment().format("DD MMMM YYYY")}</div>
                      <div className="">{salutations}</div>
                    </div>
                  </div>
                  <div className="text-underline">
                    <strong>
                      <u>{subject}</u>
                    </strong>
                  </div>
                  <div>
                    ID No: <strong>{res?.userID}</strong>
                  </div>
                  <div>
                    Student: <strong>{res?.name}</strong>
                  </div>
                  <div>
                    Class: <strong>{res?.classID}</strong>
                  </div>
                  <div>
                    Amount Owed: <strong>{res?.owe}</strong>
                  </div>
                  <p className="my-3">{message}</p>
                  <div>{closing}</div>
                  <div>{signature}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <SendMessageForm
            loading={loading}
            closing={closing}
            setclosing={setclosing}
            message={message}
            setmessage={setmessage}
            signature={signature}
            setsignature={setsignature}
            errors={errors}
            register={register}
            salutations={salutations}
            setsalutations={setsalutations}
            debtors={debtors}
            subject={subject}
            handlePrint={handlePrint}
            setsubject={setsubject}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </Dialog>
  );
}
