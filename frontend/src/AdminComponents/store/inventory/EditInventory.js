import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useForm } from "react-hook-form";

export default function ResponsiveDialog({
  name,
  qty,
  newQty,
  setnewQty,
  onSubmit,
  open,
  setOpen,
}) {
  const { register, handleSubmit, errors } = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Change Item Inventory"}
      </DialogTitle>
      <form action="">
        <DialogContent>
          <div className="mb-3">
            <label className="form-label"> Name</label>
            <input
              name="name"
              type="text"
              value={name}
              readOnly
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Current Quantity</label>
            <input
              name="unit"
              type="text"
              value={qty}
              readOnly
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label"> Quantity</label>
            <input
              name="quantity"
              type="number"
              value={newQty}
              ref={register({ required: true })}
              onChange={(e) => setnewQty(e.target.value)}
              className="form-control"
              placeholder=""
            />
            {errors.quantity && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit(onSubmit)} color="primary">
            Save Changes
          </Button>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
