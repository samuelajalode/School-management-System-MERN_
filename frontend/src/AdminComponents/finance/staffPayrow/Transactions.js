import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ListTable from "../../shared/ListTable";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { monthYear } from "../../../data";
import { currentCurrency } from "../../../utils";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: "#051f3e",
    color: "#fff",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "amount", name: "Amount Paid ($)" },
  { id: "month", name: "Month" },
  { id: "bank", name: "Bank" },
  { id: "accountNumber", name: "Account Number" },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewStudentPayment({
  open,
  setOpen,
  transactions,
  name,
  totalBill,
  totalPaid,
  balance,
  id,
}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const data = transactions.map((e) => {
    return {
      ...e,
      month: monthYear[e.month].name,
    };
  });

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar color="default" className={classes.appBar}>
        <Toolbar className="py-4">
          <Typography variant="body1" className={classes.title}>
            <strong>Name: {name}</strong> <br />
            <strong>
              Total Salary:{" "}
              <NumberFormat
                value={totalBill}
                displayType={"text"}
                thousandSeparator={true}
                prefix={currentCurrency()}
              />
            </strong>{" "}
            <br />
            <strong>
              Total Amount Paid:{" "}
              <NumberFormat
                value={totalPaid}
                displayType={"text"}
                thousandSeparator={true}
                prefix={currentCurrency()}
              />
            </strong>{" "}
            <br />
            <strong>
              Fees Due:{" "}
              <NumberFormat
                value={balance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={currentCurrency()}
              />
            </strong>
            <br />
            <Link
              to={`/finance/staff/payrow/payslip/${id}`}
              className="btn orange__btn"
            >
              {" "}
              PaySlip{" "}
            </Link>
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <div className="mt-5">
        <ListTable noActions={true} data={data} tableHeader={tableHeader} />
      </div>
    </Dialog>
  );
}
