import React, { useEffect, useState } from "react";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { Link } from "react-router-dom";
import axios from "../../store/axios";

function ClassCard({ id }) {
  const [coursName, setcoursName] = useState([]);

  useEffect(() => {
    axios.get(`/classes/${id}`).then((res) => {
      setcoursName(res.data.docs);
    });
  }, [id]);

  return (
    <div className=" col-xs-12 col-sm-6 com-md-4 mb-5">
      <div className="classCard p-5">
        {id ? (
          <Link to={`/academics/classes/${id}`}>
            <ImportContactsIcon className="icon" />
            <h5>{coursName?.name}</h5>
            <span>{id}</span>
          </Link>
        ) : (
          <div>
            <ImportContactsIcon className="icon" />
            <h5>Classes</h5>
            <span>No classes yet</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassCard;
