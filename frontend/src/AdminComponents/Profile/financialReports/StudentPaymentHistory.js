import React, { useState } from "react";
import ListTable from "../../shared/ListTable";
import axios from "../../../store/axios";
import { errorAlert, getImgSrc } from "../../../utils";
import { useSelector } from "react-redux";
import { selectClasses } from "../../../store/slices/schoolSlice";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PrintIcon from "@material-ui/icons/Print";
import ExcelButton from "../../../components/tables/ExcelExport";
import { selectUser } from "../../../store/slices/userSlice";
import { Avatar } from "@material-ui/core";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "year", name: "Academic Year" },
  { id: "term", name: "Name" },
  { id: "description", name: "Description" },
  { id: "receipt", name: "Receipt" },
  { id: "amount", name: "Amount" },
  { id: "paidTo", name: "Balance" },
];

function ViewPayment() {
  const [expenditures, setexpenditures] = useState([]);
  const [classID, setclassID] = useState("");
  const [students, setstudents] = useState([]);
  const [loading, setloading] = useState(false);
  const classes = useSelector(selectClasses);
  const [student, setstudent] = useState("");
  const [studentData, setstudentData] = useState("");

  const user = useSelector(selectUser);

  const handleSearchClass = (e) => {
    setclassID(e);
    axios.get(`/students/class/${e}`).then((res) => {
      if (res.data.error) {
        return errorAlert(res.data.error);
      }
      setstudents(res.data.users);
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (student) {
      setloading(true);
      let transactionData = await axios.get(`/transactions/student/${student}`);
      setexpenditures(
        transactionData.data.map((y) => {
          return {
            date: y.date,
            amount: y.amount,
            description: y.description,
            term: y.fees.term,
            year: y.fees.academicYear,
            receipt: y._id,
            paidTo: "admin",
          };
        })
      );

      let data = await axios.get(`/students/student/${student}`);
      setstudentData(data.data?.student);
      setloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h3 className="">Fees Payment History</h3>
      <form className="content__container row">
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            Class
          </label>
          <div className="">
            <select
              name="academic-calendar"
              className="form-select"
              value={classID}
              onChange={(e) => handleSearchClass(e.target.value)}
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {classes &&
                classes.map((y) => (
                  <option value={y.classCode} key={y._id}>
                    {y?.classCode}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {classID && (
          <div className="col-sm-6 col-md-4 mb-3">
            <label htmlFor="name" className=" col-form-label">
              Student
            </label>
            <div className="">
              <select
                name="academic-calendar"
                className="form-select"
                value={student}
                onChange={(e) => setstudent(e.target.value)}
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                {students &&
                  students.map((y) => (
                    <option value={y.userID} key={y._id}>
                      {y?.name} {y.surname} - {y.userID}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}
        <div className="mb-3">
          <button
            onClick={handleSearch}
            disabled={loading}
            type="submit"
            className="btn blue__btn"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Search
          </button>
        </div>
      </form>

      {studentData && (
        <>
          <div className="mt-5 content__container" id="section-to-print">
            <div className="blue_bg p-5">
              <div className="d-flex justify-content-around align-items-stretch">
                <Avatar
                  src={getImgSrc(studentData?.profileUrl)}
                  alt=""
                  width="100px"
                  height="100px"
                />
                <div>
                  <h5>
                    <strong>
                      {studentData?.name} {studentData?.surname}
                    </strong>
                  </h5>
                  <h6>Class {studentData?.classID}</h6>
                </div>
              </div>
            </div>
            <ListTable
              data={expenditures}
              noActions={true}
              tableHeader={tableHeader}
            />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button onClick={handlePrint} className="btn blue__btn mr-3">
              Print <PrintIcon />
            </button>
            {/* <button onClick={handleSave} className="btn blue__btn ml-3">
              Save <InsertDriveFileIcon />
            </button> */}
            <ExcelButton
              data={expenditures}
              columns={tableHeader}
              btn={
                <>
                  <InsertDriveFileIcon /> Save
                </>
              }
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ViewPayment;
