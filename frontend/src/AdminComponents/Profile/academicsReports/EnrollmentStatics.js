import React, { useState, useEffect } from "react";
import axios from "../../../store/axios";

import { useSelector } from "react-redux";
import { selectCampuses } from "../../../store/slices/schoolSlice";
import Excel from "../../../components/tables/ExcelExport";

function EnrollmentStatics() {
  const [school, setschool] = useState({});
  const [data, setdata] = useState([]);
  const campuses = useSelector(selectCampuses);

  useEffect(() => {
    axios.get("/school").then((res) => {
      setschool(res.data);
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      let students = await (await axios.get("/students")).data;
      axios.get(`/classes`).then((res) => {
        setdata(
          res.data.map((e) => {
            let classStudents = students.filter(
              (i) => i.classID === e.classCode
            );
            let female = classStudents.filter((i) => i.gender === "female")
              .length;
            let male = classStudents.filter((i) => i.gender === "male").length;
            return {
              ...e,
              female,
              male,
              total: classStudents.length,
              unspecified: classStudents.length - (male + female),
              campus: campuses.find((i) => i._id === e.campusID)?.name,
            };
          })
        );
      });
    };

    getData();
  }, [campuses]);

  const handlePrint = () => {
    window.print();
  };

  const columns = [
    { id: "name", name: "Class" },
    { id: "campus", name: "Campus" },
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "unspecified", name: "Unspecified" },
    { id: "total", name: "Total" },
  ];

  return (
    <>
      <div className="content__container" id="section-to-print">
        <div className="text-center">
          {/* <img width="100px" src={getImgSrc(school?.profileUrl)} alt="" /> */}
          <h5>
            <strong>{school?.fullName}</strong>
          </h5>
          <h6>{school?.motto}</h6>

          <h5 className="my-4">ENROLLMENT STATISTICS</h5>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Class/ Group</th>
              <th scope="col">Campus / Section</th>
              <th scope="col">Male</th>
              <th scope="col">Female</th>
              <th scope="col">UnSpecified</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((e) => (
                <tr key={e._id}>
                  <td>{e?.name}</td>
                  <td>{e?.campus}</td>
                  <td>{e?.male}</td>
                  <td>{e?.female}</td>
                  <td>{e?.unspecified}</td>
                  <td>{e?.total}</td>
                </tr>
              ))}
            <tr>
              <th>Total</th>
              <td></td>
              <td>{data.reduce((v, i) => v + i.male, 0)}</td>
              <td>{data.reduce((v, i) => v + i.female, 0)}</td>
              <td>{data.reduce((v, i) => v + i.unspecified, 0)}</td>
              <td>{data.reduce((v, i) => v + i.total, 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-3 text-center">
        <button onClick={handlePrint} className="btn blue__btn mr-2">
          Print
        </button>
        <Excel data={data} columns={columns} />
      </div>
    </>
  );
}

export default EnrollmentStatics;
