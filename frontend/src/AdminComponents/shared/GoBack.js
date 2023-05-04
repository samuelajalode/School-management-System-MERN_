import React from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";

function GoBack({ link, name }) {
  return (
    <div className="d-flex justify-content-end mb-5">
      <Link to={link} className="link">
        {name}
        <ArrowForwardIosIcon className="icon" />
      </Link>
    </div>
  );
}

export default GoBack;
