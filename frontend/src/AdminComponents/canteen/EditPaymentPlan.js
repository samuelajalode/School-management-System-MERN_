import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

export default function FormDialog({
  open,
  setOpen,
  descriptions,
  setdescriptions,
  prices,
  setprices,
  name,
  setname,
  title,
  settitle,
  isAdd,
  isPlans,
  onSubmit,
  loading,
}) {
  const { register, handleSubmit, errors } = useForm();
  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth="md"
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Set Canteen PaymentPlan
      </DialogTitle>
      <form action="">
        <DialogContent>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Plan 1</th>
                <th scope="col">Plan 2</th>
                <th scope="col">Plan 3</th>
              </tr>
            </thead>
            <tbody>
              {isPlans && (
                <>
                  <tr>
                    <th scope="row">Plan Name</th>
                    <td>
                      <input
                        ref={register({ required: true })}
                        type="text"
                        name="name1"
                        value={name?.plan1}
                        onChange={(e) =>
                          setname({ ...name, plan1: e.target.value })
                        }
                        className="form-control"
                        placeholder="Plan name"
                      />
                      {errors.name1 && (
                        <div className="text-danger mb-3">
                          This field is required.
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Plan  name"
                        value={name?.plan2}
                        onChange={(e) =>
                          setname({ ...name, plan2: e.target.value })
                        }
                        ref={register({ required: true })}
                        name="name2"
                      />
                      {errors.name2 && (
                        <div className="text-danger mb-3">
                          This field is required.
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Plan  name"
                        name="name3"
                        value={name?.plan3}
                        onChange={(e) =>
                          setname({ ...name, plan3: e.target.value })
                        }
                        ref={register({ required: true })}
                      />
                      {errors.name3 && (
                        <div className="text-danger mb-3">
                          This field is required.
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Plan Price</th>
                    <td>
                      <input
                        value={prices?.plan1}
                        onChange={(e) =>
                          setprices({ ...prices, plan1: e.target.value })
                        }
                        type="number"
                        className="form-control"
                        placeholder="Plan's price"
                        name="price1"
                        ref={register({ required: true })}
                      />
                      {errors.price1 && (
                        <div className="text-danger mb-3">
                          This field is required.
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        value={prices?.plan2}
                        onChange={(e) =>
                          setprices({ ...prices, plan2: e.target.value })
                        }
                        type="number"
                        className="form-control"
                        placeholder="Plan's price"
                        name="price2"
                        ref={register({ required: true })}
                      />
                      {errors.price2 && (
                        <div className="text-danger mb-3">
                          This field is required.
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        value={prices?.plan3}
                        onChange={(e) =>
                          setprices({ ...prices, plan3: e.target.value })
                        }
                        type="number"
                        className="form-control"
                        placeholder="Plan's price"
                        name="price3"
                        ref={register({ required: true })}
                      />
                      {errors.price3 && (
                        <div className="text-danger mb-3">
                          This field is required.
                        </div>
                      )}
                    </td>
                  </tr>
                </>
              )}
              <tr>
                {isAdd ? (
                  <th>
                    <input
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Service's name"
                      name="title"
                      ref={register({ required: true })}
                    />
                    {errors.title && (
                      <div className="text-danger mb-3">
                        This field is required.
                      </div>
                    )}
                  </th>
                ) : (
                  <th scope="row">{descriptions?.name || "Description"}</th>
                )}

                <td>
                  <textarea
                    value={descriptions?.plan1}
                    onChange={(e) =>
                      setdescriptions({
                        ...descriptions,
                        plan1: e.target.value,
                      })
                    }
                    rows={3}
                    className="form-control"
                    placeholder="Type here..."
                    name="description1"
                    ref={register({ required: true })}
                  />
                  {errors.description1 && (
                    <div className="text-danger mb-3">
                      This field is required.
                    </div>
                  )}
                </td>
                <td>
                  <textarea
                    value={descriptions?.plan2}
                    onChange={(e) =>
                      setdescriptions({
                        ...descriptions,
                        plan2: e.target.value,
                      })
                    }
                    rows={3}
                    className="form-control"
                    placeholder="Type here..."
                    name="description2"
                    ref={register({ required: true })}
                  />
                  {errors.description2 && (
                    <div className="text-danger mb-3">
                      This field is required.
                    </div>
                  )}
                </td>
                <td>
                  <textarea
                    value={descriptions?.plan3}
                    onChange={(e) =>
                      setdescriptions({
                        ...descriptions,
                        plan3: e.target.value,
                      })
                    }
                    rows={3}
                    name="description3"
                    ref={register({ required: true })}
                    className="form-control"
                    placeholder="Type here..."
                  />
                  {errors.description3 && (
                    <div className="text-danger mb-3">
                      This field is required.
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            color="primary"
          >
            {loading && (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            )}
            {isAdd ? "Add" : "Save Changes"}
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
