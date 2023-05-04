import React from "react";
import { getCapitalize } from "../../utils";
import moment from "moment";

function InfoTab({ user, isStaff }) {
  return (
    <div>
      {isStaff && (
        <div className="row mb-3">
          <div className="col-4">Title: </div>
          <div className="col-6">{getCapitalize(user?.title || "N/A")} </div>
        </div>
      )}

      <div className="row  mb-3">
        <div className="col-4">Surname: </div>
        <div className="col-6">{getCapitalize(user?.surname || "N/A")} </div>
      </div>
      {user?.middleName && (
        <div className="row  mb-3">
          <div className="col-4">Middle Name </div>
          <div className="col-6">
            {getCapitalize(user?.middleName || "N/A")}{" "}
          </div>
        </div>
      )}
      <div className="row  mb-3">
        <div className="col-4">Gender: </div>
        <div className="col-6">{user?.gender || "N/A"}</div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Email: </div>
        <div className="col-6">{user?.email || "N/A"}</div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Date of Birth: </div>
        <div className="col-6">
          {user?.dateOfBirth
            ? moment(user?.dateOfBirth).format("D MMMM YYYY")
            : "N/A"}{" "}
        </div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Place of birth </div>
        <div className="col-6">{user?.placeOfBirth || "N/A"} </div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Religion: </div>
        <div className="col-6">{user?.religion || "N/A"}</div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Nationality: </div>
        <div className="col-6">{user?.nationality || "N/A"} </div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Healthy Condition: </div>
        <div className="col-6">{user?.health || "N/A"} </div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Disease: </div>
        <div className="col-6">{user?.disease || "N/A"} </div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Alleges: </div>
        <div className="col-6">{user?.allege || "N/A"} </div>
      </div>
    </div>
  );
}

export default InfoTab;
