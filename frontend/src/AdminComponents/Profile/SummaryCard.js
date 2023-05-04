import React from "react";
import Card from "@material-ui/core/Card";

function SummaryCard({ name, percentage, value }) {
  return (
    <div className="col-xs-12 col-sm-4 mb-3">
      <Card className=" ">
        <div className="d-flex justify-content-between align-items-center heading blue__btn p-2 text-light">
          <div>
            <h5>{name}</h5>
          </div>
          <div>{percentage && <h6>%</h6>}</div>
        </div>
        <div className="d-flex justify-content-between heading align-items-center p-2">
          <h3>{value}</h3>
          <h6>{percentage}</h6>
        </div>
      </Card>
    </div>
  );
}

export default SummaryCard;
