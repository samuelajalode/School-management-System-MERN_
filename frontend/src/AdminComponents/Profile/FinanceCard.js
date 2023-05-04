import React from "react";
import { Link } from "react-router-dom";
import DescriptionIcon from "@material-ui/icons/Description";

function FinanceCard({ route, name, title }) {
  return (
    <div className="card p-3 ">
      <div className="text-center">
        <Link className="text-info" to={route}>
          {title && (
            <div className="d-flex justify-content-center align-items-center heading blue__btn p-2 text-light">
              <h5>{title}</h5>
            </div>
          )}
          {name}
          <br />
          <DescriptionIcon />
        </Link>
      </div>
    </div>
  );
}

export default FinanceCard;
