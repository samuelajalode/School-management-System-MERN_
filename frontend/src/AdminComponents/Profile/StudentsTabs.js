import React from "react";
import Card from "./SummaryCard";

function StudentsTabs({ count }) {
  return (
    <div>
      <h3 className="mb-5">Students Overview</h3>
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
          <Card name="Total" value={count?.students || 0} />
        </div>
      </div>
      <div className="mb-5">
        <h3>Admissions</h3>
        <div className="row ">
          <Card
            name="Students Registered Today"
            value={count?.todayRegisteredStudents || 0}
          />
          <Card
            name="Students Registered Yesterday"
            value={count?.yesterdayRegisteredStudents || 0}
          />
          <Card name="Scholarships" value={count?.scholarships || 0} />
        </div>
      </div>
      <div className="mb-3 row">
        <Card
          name="Birthdays Today"
          value={count?.todayBirthdayStudents || 0}
        />
        <Card
          name="Birthdays Tomorrow"
          value={count?.yesterdayBirthdayStudents || 0}
        />
        <Card
          name="Birthdays Yesterday"
          value={count?.yesterdayBirthdayStudents || 0}
        />
      </div>
    </div>
  );
}

export default StudentsTabs;
