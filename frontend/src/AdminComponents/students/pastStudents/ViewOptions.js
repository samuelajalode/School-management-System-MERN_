import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";

export default function SimpleMenu({
  id,
  route,
  history,
  handleDelete,
  handleWithdraw,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector(selectUser);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => history.push(`/${route}/${id}`)}>
          View
        </MenuItem>
        {user?.role === "admin" && (
          <MenuItem
            onClick={() => {
              handleWithdraw(id);
            }}
          >
            Re-admit
          </MenuItem>
        )}

        {user?.role === "admin" && (
          <MenuItem
            onClick={() => {
              handleDelete(id);
            }}
          >
            Delete
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
