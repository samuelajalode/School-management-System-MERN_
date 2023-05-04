import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../../store/axios";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

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

export default function CustomizedDialogs({
  student,
  setstudent,
  open,
  setOpen,
  totalprice,
  amount,
  setamount,
  buyitems,
  handleChangeDiscount,
  items,
  loading,
  handleSetitem,
  handleAddItem,
  handleChangeQty,
  handleAddSale,
}) {
  const [students, setstudents] = useState([]);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("/students").then((res) => {
      setstudents(res.data);
    });
  }, []);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      className="content__container"
      aria-labelledby="customized-dialog-title"
    >
      <AppBar color="transparent" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Create New Sale
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
      <form action="" className="mt-3 px-5">
        <div className="row">
          <div className="col-sm-6   mb-3">
            <label className=" form-label">Student</label>
            <select
              value={student}
              onChange={(e) => setstudent(e.target.value)}
              name="student"
              className="form-select"
              aria-label="Default select example"
            >
              <option defaultValue hidden>
                select
              </option>
              {students?.length > 0 ? (
                students?.map((e) => (
                  <option key={e._id} value={e.userID}>
                    {e.name} {e?.surname}
                  </option>
                ))
              ) : (
                <option disabled>No student yet</option>
              )}
            </select>
          </div>
          <div className=" col-sm-6   mb-3">
            <label className=" form-label">Amount Paid</label>
            <input
              name="employmentdate"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              type="number"
              className="form-control"
            />
          </div>
        </div>
        <table className="table table-borderless">
          <thead className="table-dark">
            <tr>
              <th colSpan={3}>Item Details</th>
              <th scope="col">Quantity</th>
              <th scope="col">Rate</th>
              <th scope="col">Discount (%)</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {buyitems &&
              buyitems.map((e, i) => (
                <tr key={i}>
                  <th colSpan={3}>
                    <textarea
                      className="form-control"
                      name="item"
                      rows="2"
                      value={e.name}
                      readOnly
                    ></textarea>
                    <select
                      defaultValue="item"
                      onChange={(a) => handleSetitem(a.target.value, i)}
                      name="item"
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option defaultValue hidden>
                        select
                      </option>
                      {items?.length > 0 ? (
                        items?.map((y) => (
                          <option key={y._id} value={y?._id}>
                            {y.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No item yet</option>
                      )}
                    </select>
                  </th>
                  <th scope="col">
                    <input
                      name="quantity"
                      className="form-control"
                      onChange={(e) => handleChangeQty(e.target.value, i)}
                      value={e.qty}
                      type="number"
                    />
                  </th>
                  <th scope="col">
                    <input
                      name="rate"
                      readOnly
                      value={e.rate}
                      className="form-control"
                      type="number"
                    />
                  </th>
                  <th scope="col">
                    <input
                      name="discount"
                      className="form-control"
                      value={e.discount}
                      onChange={(e) => handleChangeDiscount(e.target.value, i)}
                      type="number"
                    />
                  </th>
                  <th scope="col">
                    <input
                      name="amount"
                      className="form-control"
                      readOnly
                      value={e.amount}
                      type="number"
                    />
                  </th>
                </tr>
              ))}

            <tr>
              <button onClick={handleAddItem} className="btn blue__btn">
                + Add another item
              </button>
            </tr>
            <tr>
              <th colSpan={5}></th>
              <th colSpan={2}>
                <div className="d-flex justify-content-between">
                  <span>Items Total Price</span>
                  <span>{totalprice}</span>
                </div>
              </th>
            </tr>
            <tr>
              <th colSpan={5}></th>
              <th colSpan={2}>
                <div className="d-flex justify-content-between">
                  <span>Balance </span>
                  <span>{(amount - totalprice).toFixed(2)}</span>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <button
            className="btn blue__btn"
            autoFocus
            disabled={totalprice === 0 || amount === 0 || loading}
            onClick={handleAddSale}
            color="primary"
          >
            Complete Sale
          </button>
        </div>
      </form>
    </Dialog>
  );
}
