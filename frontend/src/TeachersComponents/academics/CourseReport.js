import React, { useState, useEffect } from "react";
import Table from "./ReportTable";
import { useParams } from "react-router-dom";
import axios from "../../store/axios";
import PrintIcon from "@material-ui/icons/Print";
import Loading from "../../Loading";
import Search from "./Search";

function CourseReport() {
  const [students, setstudents] = useState([]);
  const { id, classID } = useParams();
  const [loading, setloading] = useState(false);
  const [term, setterm] = useState("");
  const [academicYear, setacademicYear] = useState("");
  const [show, setshow] = useState(false);
  const [showterm, setshowterm] = useState("");
  const [showyear, setshowyear] = useState("");
  const [school, setschool] = useState([]);

  useEffect(() => {
    axios.get("/school").then((res) => {
      setschool(res.data);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setshow(false);
    if (term && academicYear) {
      setloading(true);
      axios
        .get(`/sba/${classID}/${id}/${academicYear}/${term}`)
        .then((result) => {
          setloading(false);
          let data = result.data.docs;
          setshow(true);
          setshowterm(term);
          setshowyear(academicYear);
          setstudents(data.students);
        });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  console.log(students);

  return (
    <>
      <Search
        term={term}
        setterm={setterm}
        academicYear={academicYear}
        setacademicYear={setacademicYear}
        loading={loading}
        handleSearch={handleSearch}
      />
      {show && (
        <div className="content__container">
          {loading && <Loading />}
          <button onClick={handlePrint} className="btn blue__btn float-right">
            Print <PrintIcon />
          </button>
          <div className=" mb-3" id="section-to-print">
            <div className="text-center">
              <h3>{school?.fullName}</h3>
              <p>
                <strong>{school?.motto}</strong>
              </p>
            </div>

            <div className="row">
              <h4 className="col">Class: {classID}</h4>
              <h4 className="col">Course: {id}</h4>
              <h4 className="col">Year: {showyear}</h4>
              <h4 className="col">Term: {showterm}</h4>
            </div>
            <Table rows={students} classID={classID} course={id} />
          </div>
        </div>
      )}
    </>
  );
}

export default CourseReport;
