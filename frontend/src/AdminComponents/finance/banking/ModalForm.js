import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
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

export default function CustomizedDialogs(props) {
  const { register, handleSubmit, errors } = useForm();

  let {
    inputTitle,
    open,
    setOpen,
    title,
    date,
    setdate,
    number,
    payee,
    setpayee,
    amount,
    description,
    setdescription,
    isTransfer,
    transfer,
    setamount,
    setnumber,
    onSubmit,
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <form action="">
          <DialogContent>
            {isTransfer && (
              <div className="row mb-3">
                <label className="col-sm-4 col-md-2 col-form-label">
                  Bank Account
                </label>
                <div className="col-sm-8 col-md-10">
                  <input
                    value={transfer?.currentBank}
                    readOnly
                    type="text"
                    className="form-control"
                    name="bank"
                  />
                </div>
              </div>
            )}
            <div className="row mb-3">
              <label className="col-sm-4 col-md-2 col-form-label">Date</label>
              <div className="col-sm-8 col-md-10">
                <input
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                  ref={register({ required: true })}
                  type="date"
                  className="form-control"
                  name="date"
                />
                {errors.date && (
                  <span className="form-error text-danger mb-2">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">
                {inputTitle?.number ? inputTitle?.number : "Check Number"}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setnumber(e.target.value)}
                  ref={register({ required: true })}
                  className="form-control"
                  name="number"
                />
                {errors.number && (
                  <span className="form-error text-danger mb-2">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            {isTransfer && (
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Transfer To</label>
                <div className="col-sm-10">
                  <select
                    value={transfer?.transferBank}
                    ref={register({ required: true })}
                    name="transfer"
                    onChange={(e) => transfer?.settransferBank(e.target.value)}
                    className="form-select"
                  >
                    <option defaultValue hidden>
                      Choose...
                    </option>
                    {transfer?.bankOptions &&
                      transfer?.bankOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                  {errors.transfer && (
                    <span className="form-error text-danger mb-2">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">
                {inputTitle?.payee ? inputTitle?.payee : "Payee"}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  value={payee}
                  onChange={(e) => setpayee(e.target.value)}
                  ref={register({ required: true })}
                  className="form-control"
                  name="payee"
                />
                {errors.number && (
                  <span className="form-error text-danger mb-2">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Amount</label>
              <div className="col-sm-10">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setamount(e.target.value)}
                  ref={register({ required: true })}
                  className="form-control"
                  name="amount"
                />
                {errors.amount && (
                  <span className="form-error text-danger mb-2">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <textarea
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  rows={5}
                  className="form-control"
                  name="description"
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
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
