import React from "react";
import Card from "./SummaryCard";

function SummaryTab({ count }) {
  return (
    <div className="summary__page">
      <div className="mb-5">
        <h3>Students</h3>
        <div className="row ">
          <Card
            name="Female"
            value={count?.femaleStudents || 0}
            percentage={(
              ((count?.femaleStudents || 0) / (count?.students || 0)) *
              100
            ).toFixed(2)}
          />
          <Card
            name="Male"
            value={count?.maleStudents || 0}
            percentage={(
              ((count?.maleStudents || 0) / (count?.students || 0)) *
              100
            ).toFixed(2)}
          />
          <Card name="Total" value={count?.students} />
        </div>
      </div>
      <div className="mb-5">
        <h3>Staff</h3>
        <div className="row ">
          <Card
            name="Female"
            value={count?.femaleStaff || 0}
            percentage={(
              ((count?.femaleStaff || 0) / (count?.staff || 0)) *
              100
            ).toFixed(2)}
          />
          <Card
            name="Male"
            value={count?.maleStaff || 0}
            percentage={(
              ((count?.maleStaff || 0) / (count?.staff || 0)) *
              100
            ).toFixed(2)}
          />
          <Card name="Total" value={count?.staff} />
        </div>
      </div>
      <div className="mb-3 row">
        <Card name="Divisions" value={count?.divisions || 0} />
        <Card name="Departments" value={count?.departments || 0} />
        <Card name="Sections" value={count?.sections || 0} />
        <Card name="Courses" value={count?.courses || 0} />
        <Card name="Classes" value={count?.classes || 0} />
        <Card name="Prefects" value={count?.prefects || 0} />
      </div>
    </div>
  );
}

export default SummaryTab;
