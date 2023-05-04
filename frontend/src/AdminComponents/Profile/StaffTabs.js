import React from "react";
import Card from "./SummaryCard";

function StaffTabs({ count }) {
  return (
    <div>
      <h3 className="mb-5">Staff Overview</h3>
      <div className="mb-5">
        <h3>Staffs</h3>
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
        <Card name="Birthdays Today" value={count?.todayBirthdayStaff || 0} />
        <Card
          name="Birthdays Tomorrow"
          value={count?.yesterdayBirthdayStaff || 0}
        />
        <Card
          name="Birthdays Yesterday"
          value={count?.yesterdayBirthdayStaff || 0}
        />
      </div>
    </div>
  );
}

export default StaffTabs;
