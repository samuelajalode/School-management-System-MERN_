import React from "react";
import Logout from "./Logout";
import ChangePassword from "./ChangePassword";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../store/slices/userSlice";

function SettingsPage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Account Settings</h3>
      <ChangePassword id={user?.id} />
      <Logout user={user} dispatch={dispatch} loggout={logout} />
    </div>
  );
}

export default SettingsPage;
