import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { selectYearGroup } from "../../store/slices/schoolSlice";
import axios from "../../store/axios";
import PrintIcon from "@material-ui/icons/Print";
import Search from "./Search";

function ReportCard() {
  const [results, setresults] = useState([]);
  const currentUser = useSelector(selectUser);
  const [user, setuser] = useState({});
  const [show, setshow] = useState(false);
  const [year, setyear] = useState("");
  const years = useSelector(selectYearGroup);
  const [term, setterm] = useState("");
  const [loading, setloading] = useState(false);
  const [selectedterm, setselectedterm] = useState("");
  const [selectedyear, setselectedyear] = useState("");
  const [school, setschool] = useState([]);

  useEffect(() => {
    axios.get("/school").then((res) => {
      setschool(res.data);
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      let student = await axios.get(`/students/student/${currentUser?.userID}`);
      setuser(student.data.student);
    };
    getData();
  }, [currentUser]);

  const handlePrint = () => {
    window.print();
  };

  const getTotal = (exams, work) => {
    if (!work && !exams) {
      return "-";
    }
    return Number(exams || 0) + Number(work || 0);
  };

  const getGrade = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    if (num >= 75 && num <= 100) {
      return "A1";
    } else if (num >= 70 && num <= 74) {
      return "B2";
    } else if (num >= 65 && num <= 69) {
      return "B3";
    } else if (num >= 60 && num <= 64) {
      return "C4";
    } else if (num >= 55 && num <= 59) {
      return "C5";
    } else if (num >= 50 && num <= 54) {
      return "C6";
    } else if (num >= 45 && num <= 49) {
      return "D7";
    } else if (num >= 40 && num <= 44) {
      return "E8";
    } else if (num >= 0 && num <= 39) {
      return "F9";
    } else {
      return null;
    }
  };

  const getInterpretation = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    num = Number(num);
    if (num > 75 && num <= 100) {
      return "Excellent";
    } else if (num >= 70 && num <= 74) {
      return "Vert good";
    } else if (num >= 65 && num <= 69) {
      return "Good";
    } else if (num >= 60 && num <= 64) {
      return "Credit";
    } else if (num >= 55 && num <= 59) {
      return "Credit";
    } else if (num >= 50 && num <= 54) {
      return "Credit";
    } else if (num >= 45 && num <= 49) {
      return "Pass";
    } else if (num >= 40 && num <= 44) {
      return "Pass";
    } else if (num >= 0 && num <= 39) {
      return "Failure";
    } else {
      return null;
    }
  };

  const handleSearch = async (e) => {
    setloading(true);
    e.preventDefault();
    await axios
      .get(`sba/student/${currentUser?.userID}/${year}/${term}`)
      .then((res) => {
        setloading(false);
        setshow(true);
        setselectedterm(term);
        setselectedyear(year);
        setresults(res.data.docs);
        console.log(res.data.docs);
      });
  };

  return (
    <>
      <div className="mb-5">
        <Search
          yearGroup={years}
          academicYear={year}
          setacademicYear={setyear}
          term={term}
          setterm={setterm}
          loading={loading}
          handleSearch={handleSearch}
        />
      </div>
      {show && (
        <>
          <div id="section-to-print" className="content__container my-5">
            <div className="text-center">
              <h3>{school?.fullName}</h3>
              <p>
                <strong>{school?.motto}</strong>
              </p>
            </div>
            <div className=" mb-5">
              <div>
                <h5>Report Card</h5>
                <h6>
                  Name: {user?.name} {user?.middleName} {user?.surname} -{" "}
                  {user?.userID}
                </h6>
                <h6>Class: {user?.classID}</h6>
                <h6> Year: {selectedyear}</h6>
                <h6>Term:{selectedterm}</h6>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Courses</th>
                  <th scope="col">Classwork </th>
                  <th scope="col">Classwork %</th>
                  <th scope="col">Exam </th>
                  <th scope="col">Exam %</th>
                  <th scope="col">Total %</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Interpretation</th>
                  <th scope="col">Position</th>
                </tr>
              </thead>
              <tbody>
                {results.length > 0 ? (
                  results.map((res) => (
                    <tr key={res?._id}>
                      <td>{res?.course}</td>
                      <td>{res.classWork || "-"}</td>
                      <td>{res.classWorkPercentage || "-"}</td>
                      <td>{res?.exam || "-"}</td>
                      <td>{res?.examPercentage || "-"}</td>
                      <td>
                        {getTotal(res?.examPercentage, res.classWorkPercentage)}
                      </td>
                      <td>
                        {getGrade(res?.examPercentage, res.classWorkPercentage)}
                      </td>
                      <td>
                        {getInterpretation(
                          res?.examPercentage,
                          res.classWorkPercentage
                        )}
                      </td>
                      <td>{res?.position}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center text-danger">
                      <h5>No data yet</h5>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>{" "}
          <div className="d-flex justify-content-center mb-5">
            <button onClick={handlePrint} className="btn blue__btn">
              <PrintIcon />
              Print
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ReportCard;
