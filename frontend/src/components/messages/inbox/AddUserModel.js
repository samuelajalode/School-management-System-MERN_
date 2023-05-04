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
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  icon: {
    width: "50px",
    height: "50px",
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

export default function CustomizedDialogs({
  open,
  setOpen,
  search,
  setsearch,
  handleSearch,
  loadingSearch,
  searchResults,
  loading,
  handleSendRequest,
  setsearchResults,
}) {
  const handleClose = () => {
    setsearch("");
    setsearchResults("");
    setOpen(false);
  };

  const handleClear = () => {
    setsearch("");
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Find User
        </DialogTitle>
        <DialogContent>
          <form action="" onSubmit={handleSearch}>
            <div className="search__user">
              <div>
                <SearchIcon />
                <input
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                  type="text"
                  placeholder="Search by name or userID"
                />
              </div>
              {search && !loadingSearch && <CancelIcon onClick={handleClear} />}
              <div>
                {loadingSearch && (
                  <CircularProgress style={{ width: "20px", height: "20px" }} />
                )}
              </div>
            </div>
          </form>
          <div className="mt-3 d-flex results__container justify-content-between align-items-start">
            <ul>
              {searchResults &&
                searchResults.map((e) => (
                  <li>
                    <button
                      onClick={() => handleSendRequest(e?.userID)}
                      className="btn"
                    >
                      {e.name} {e.surname} - {e.userID}
                    </button>
                  </li>
                ))}
            </ul>
            {loading && (
              <CircularProgress style={{ width: "20px", height: "20px" }} />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
