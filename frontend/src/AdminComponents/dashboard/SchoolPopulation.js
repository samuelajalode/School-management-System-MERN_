import React from "react";
import ComplexDonut from "react-svg-donuts/dist/complex";
import "react-svg-donuts/dist/index.css";

function Population({ maleStudents, femaleStudents }) {
  return (
    <div className="content__container attendances">
      <h3>Students</h3>

      <ComplexDonut
        size={200}
        radius={40}
        segments={[
          {
            color: "#ffa201",
            value: femaleStudents || 0,
          },
          {
            color: "#051f3e",
            value: maleStudents || 0,
          },
        ]}
        thickness={40}
        startAngle={-90}
      />

      <div className="graph__keys row mt-4">
        <div className=" col-sm-5">
          <div className="color__box female__color"></div>
          <div className="muted-text">Female Students</div>
          <h6>
            <strong>{femaleStudents || 0}</strong>
          </h6>
        </div>
        <div className=" col-sm-5">
          <div className="color__box male__color"></div>
          <div className="muted-text">Male Students</div>
          <h6>
            <strong>{maleStudents || 0}</strong>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Population;
