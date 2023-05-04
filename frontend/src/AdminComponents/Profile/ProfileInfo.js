import React from "react";
import { getImgSrc } from "../../utils";

function ProfileInfo({ admin }) {
  return (
    <div className="content__container mb-5 text-center">
      <div className="">
        <img height="200px" src={getImgSrc(admin?.profileUrl)} alt="" />
      </div>
      <div className="mb-3">
        <h3>{admin?.fullName}</h3>
        <h5>{admin?.motto}</h5>
      </div>
      <div className="row">
        <div className="col">
          <h6>Email</h6>
          <h5>
            <strong>{admin?.email || "not set"}</strong>{" "}
          </h5>
        </div>
        <div className="col">
          <h6>Telephone</h6>
          <h5>
            {" "}
            <strong>{admin?.telephone || "not set"}</strong>
          </h5>
        </div>
        <div className="col">
          <h6>Address</h6>
          <h5>
            <strong>{admin?.address || "not set"}</strong>{" "}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
