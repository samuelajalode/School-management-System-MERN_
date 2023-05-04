import React, { useState, useEffect } from "react";
import Info from "../../components/userInfoTabs/UserInfo";
import StaffTabs from "../../components/userInfoTabs/StaffTabs";
import axios from "../../store/axios";
import { errorAlert } from "../../utils";
import { useParams, useHistory } from "react-router-dom";

function StaffDetails() {
  const [details, setdetails] = useState({});
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setloading(true);
    axios
      .get(`/teachers/${id}`)
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          history.push("/staff");
          // errorAlert(res.data.error);
          return 0;
        }
        setdetails(res.data.teacher);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, [id, history]);

  console.log(details);

  return (
    <div>
      {!loading && (
        <>
          <h3>Staff Details</h3>
          {!details ? (
            <h1 className="text-danger text-center">Staff Member not found</h1>
          ) : (
            <div className="row">
              <div className="col-xs-12  ">
                <Info
                  name={details?.name}
                  surname={details?.surname}
                  middleName={details?.middleName}
                  role={details?.role}
                  photoUrl={details?.profileUrl}
                  route="staff"
                  id={details?.userID}
                />
              </div>
              <div className="col-xs-12 ">
                <StaffTabs user={details} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default StaffDetails;
