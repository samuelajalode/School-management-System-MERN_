import React, { useState, useEffect } from "react";
//import ListTable from "../../shared/ListTable";
import axios from "../../../store/axios";
//import { getTrimString, errorAlert } from "../../../utils";
import { useSelector } from "react-redux";
import {
  selectYearGroup,
  //selectFees,
  selectCampuses,
  selectDivisions,
  selectDormitories,
  selectSection,
  selectClasses,
} from "../../../store/slices/schoolSlice";
//import moment from "moment";
import { selectUser } from "../../../store/slices/userSlice";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PrintIcon from "@material-ui/icons/Print";
import { pdf } from "../../../components/tables/pdf";

function ViewPayment() {
  const [data, setdata] = useState("");
  const [year, setyear] = useState("");
  const [selected, setselected] = useState("");
  const [value, setvalue] = useState("");
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const [fees, setfees] = useState([]);
  const classes = useSelector(selectClasses);
  const years = useSelector(selectYearGroup);
  const user = useSelector(selectUser);
  const sections = useSelector(selectSection);
  const dormitories = useSelector(selectDormitories);
  const division = useSelector(selectDivisions);
  const campus = useSelector(selectCampuses);

  console.log(fees);

  useEffect(() => {
    axios.get("/fees").then((res) => {
      setfees(res.data);
    });
  }, []);

  const handleSearch = () => {
    if (selected && value) {
      setloading(true);
      axios
        .get(`/students/number/${selected}/${value}`)
        .then((res) => {
          setloading(false);
          if (selected === "classID") {
            setname(value);
          } else if (selected === "section") {
            setname(sections.find((i) => i._id === value).name);
          } else if (selected === "dormitory") {
            setname(dormitories.find((i) => i._id === value).name);
          } else if (selected === "campus") {
            setname(campus.find((i) => i._id === value).name);
          } else if (selected === "division") {
            setname(division.find((i) => i._id === value).name);
          }
          console.log(res);
          setdata(res.data.docs);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
  };

  const handleSave = () => {
    const headers = [
      { key: "term", label: "Term / Semester" },
      { key: "value", label: "Expected Revenue ($)" },
    ];

    pdf({
      data: [
        { term: "1st", value: calculate() },
        { term: "2nd", value: calculate() },
        { term: "3rd", value: calculate() },
      ],
      headers,
      filename: "Expected Revenue",
      title: user?.name,
      subheading: ` ${selected} - ${name}`,
    });
  };

  const calculate = () => {
    if (data?.length <= 0) {
      return 0;
    }
    let arr = data?.map((i) => {
      let fee = fees.find((e) => e.code === i?.fees);
      return {
        val: fee
          ? Object.values(fee[i.status]).reduce(
              (t, v) => Number(t) + Number(v),
              0
            )
          : 0,
      };
    });
    return arr.reduce((y, z) => Number(y) + Number(z.val), 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h3 className="">Expected Revenue Reports</h3>
      <form className="content__container row">
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            Academic Year
          </label>
          <div className="">
            <select
              name="academic-calendar"
              className="form-select"
              value={year}
              onChange={(e) => setyear(e.target.value)}
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {years &&
                years.map((y) => (
                  <option value={y.year} key={y._id}>
                    {y?.year}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-4 mb-3">
            <label htmlFor="name" className=" col-form-label">
              Search By
            </label>
            <div className="">
              <select
                name="academic-calendar"
                className="form-select"
                value={selected}
                onChange={(e) => setselected(e.target.value)}
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                <option value="classID">Class</option>
                <option value="section">section</option>
                <option value="campus">campus</option>
                <option value="dormitory">dormitory</option>
                <option value="division">division</option>
              </select>
            </div>
          </div>
          {selected === "division" && (
            <div className="col-sm-6 col-md-4 mb-3">
              <label htmlFor="name" className=" col-form-label">
                Division
              </label>
              <div className="">
                <select
                  name="academic-calendar"
                  className="form-select"
                  value={value}
                  onChange={(e) => setvalue(e.target.value)}
                >
                  <option defaultValue hidden>
                    Choose...
                  </option>
                  {division &&
                    division.map((y) => (
                      <option value={y.classCode} key={y._id}>
                        {y?.classCode}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}
          {selected === "dormitory" && (
            <div className="col-sm-6 col-md-4 mb-3">
              <label htmlFor="name" className=" col-form-label">
                Dormitory
              </label>
              <div className="">
                <select
                  name="academic-calendar"
                  className="form-select"
                  value={value}
                  onChange={(e) => setvalue(e.target.value)}
                >
                  <option defaultValue hidden>
                    Choose...
                  </option>
                  {dormitories &&
                    dormitories.map((y) => (
                      <option value={y._id} key={y._id}>
                        {y?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}
          {selected === "campus" && (
            <div className="col-sm-6 col-md-4 mb-3">
              <label htmlFor="name" className=" col-form-label">
                Campus
              </label>
              <div className="">
                <select
                  name="academic-calendar"
                  className="form-select"
                  value={value}
                  onChange={(e) => setvalue(e.target.value)}
                >
                  <option defaultValue hidden>
                    Choose...
                  </option>
                  {campus &&
                    campus.map((y) => (
                      <option value={y._id} key={y._id}>
                        {y?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}
          {selected === "section" && (
            <div className="col-sm-6 col-md-4 mb-3">
              <label htmlFor="name" className=" col-form-label">
                Section
              </label>
              <div className="">
                <select
                  name="academic-calendar"
                  className="form-select"
                  value={value}
                  onChange={(e) => setvalue(e.target.value)}
                >
                  <option defaultValue hidden>
                    Choose...
                  </option>
                  {sections &&
                    sections.map((y) => (
                      <option value={y._id} key={y._id}>
                        {y?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}
          {selected === "classID" && (
            <div className="col-sm-6 col-md-4 mb-3">
              <label htmlFor="name" className=" col-form-label">
                Class
              </label>
              <div className="">
                <select
                  name="academic-calendar"
                  className="form-select"
                  value={value}
                  onChange={(e) => setvalue(e.target.value)}
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
          )}
        </div>
        <div className="mb-3">
          <button
            onClick={handleSearch}
            disabled={loading || !value || !selected}
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

      {name && (
        <>
          <div className="mt-5 content__container">
            <div className="text-center">
              <h5>
                <strong>{user?.name}</strong>
              </h5>
              <h5>EXPECTED REVENUE REPORT</h5>
              <div>
                {selected} - {name}
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Term/ Semester</th>
                  <th scope="col">Expected Revenue ($)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1st</td>
                  <td>{calculate()}</td>
                </tr>
                <tr>
                  <td>2nd</td>
                  <td>{calculate()}</td>
                </tr>
                <tr>
                  <td>3rd</td>
                  <td>{calculate()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button onClick={handlePrint} className="btn blue__btn">
              Print <PrintIcon />
            </button>
            <button onClick={handleSave} className="btn blue__btn ml-3">
              Save <InsertDriveFileIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewPayment;
