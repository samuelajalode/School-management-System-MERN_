import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import SettingsIcon from "@material-ui/icons/Settings";
import { logout } from "../store/slices/userSlice";
import { getIntial, getCapitalize, getImgSrc } from "../utils";
import { useHistory } from "react-router-dom";
import { selectUser } from "../store/slices/userSlice";

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    history.push("/login");
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-5" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="user__avatar ">
          <h6>
            {" "}
            <strong>
              {getCapitalize(user?.name)} {getIntial(user?.middleName || "")}{" "}
              {getCapitalize(
                user?.lastName === "undefined" ? "" : user?.lastName
              )}
            </strong>{" "}
            <br /> <span>{user?.role}</span>
          </h6>
          <Avatar src={getImgSrc(user?.photoUrl)} />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>
            {getCapitalize(user?.name)} {getIntial(user?.middleName || "")}{" "}
            {getCapitalize(user?.lastName)}
          </strong>
        </CDropdownItem>
        <CDropdownItem onClick={() => history.push("/profile")}>
          <PersonIcon />
          {user.role === "admin" ? "Manage Users" : "View Profile"}
        </CDropdownItem>
        <CDropdownItem onClick={() => history.push("/settings#changepassword")}>
          <LockIcon />
          Change Password
        </CDropdownItem>
        <CDropdownItem onClick={() => history.push("/settings")}>
          <SettingsIcon />
          Settings
        </CDropdownItem>
        <CDropdownItem onClick={handleLogout}>
          <ExitToAppIcon />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
