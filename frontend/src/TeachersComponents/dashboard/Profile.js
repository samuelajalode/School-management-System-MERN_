import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfoTabs from "../../components/userInfoTabs/StaffTabs";
import Profile from "../../components/profile/UpdateProfile";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { getCapitalize, getIntial } from "../../utils";
import axios from "../../store/axios";

function ProfilePage() {
  const user = useSelector(selectUser);
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    axios.get(`/teachers/${user?.userID}`).then((res) => {
      setuserDetails(res.data.teacher);
    });
  }, [user]);

  return (
    <div className="content__container">
      <h3>About Me</h3>
      <div className="row mb-5">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Profile profile={user?.photoUrl} id={user?.id} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-8">
          <h3>
            {getCapitalize(user?.name)} {getIntial(user?.middleName || "")}{" "}
            {getCapitalize(user?.lastName)}
          </h3>
          <h6>{user?.id}</h6>
          <div className="muted-text">Role</div>
          <Link to={`/profile/edit`} className="btn blue__btn sm__btn mt-4">
            Edit
          </Link>
        </div>
      </div>
      <div className="Profile Details">
        <InfoTabs user={userDetails} />
      </div>
    </div>
  );
}

export default ProfilePage;
