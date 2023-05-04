import React, { useEffect, useState } from "react";
import StudentInfo from "../../../components/userInfoTabs/UserInfo";
import StudentTabs from "../../../components/userInfoTabs/StudentTabs";
import axios from "../../../store/axios";
import { useParams } from "react-router-dom";
import { errorAlert } from "../../../utils";
import Loading from "../../../Loading";

function StudentDetails() {
  const [details, setdetails] = useState(null);
  const [loading, setloading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setloading(true);
    axios
      .get(`/students/student/${id}`)
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setdetails(res.data.student);
      })
      .catch(() => {
        setloading(false);
      });
  }, [id]);

  return (
    <div className="student__details">
      {!loading ? (
        <>
          <h3>Student Details</h3>
          <div className="row">
            {details ? (
              <>
                <div className="col-xs-12 ">
                  <StudentInfo
                    name={details?.name}
                    surname={details?.surname}
                    middleName={details?.middleName}
                    photoUrl={details?.profileUrl}
                    role={details?.role}
                    route={"students"}
                    id={details?.userID}
                  />
                </div>
                <div className="col-xs-12 ">
                  <StudentTabs user={details} />
                </div>
              </>
            ) : (
              <h1 className="text-danger text-center">Student not found</h1>
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default StudentDetails;
