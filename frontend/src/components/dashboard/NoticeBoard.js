import React, { useState, useEffect } from "react";
import Notice from "./Notice";
import axios from "../../store/axios";
import { Link } from "react-router-dom";
import { getTrimString } from "../../utils";

function NoticeBoard({ user }) {
  const [notices, setnotices] = useState([]);

  useEffect(() => {
    axios.get("/notification").then((res) => {
      setnotices(res.data);
    });
  }, []);

  let max = 5;
  let length = notices.length;

  return (
    <div className="content__container notices">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3>Notice Board</h3>
        </div>
        <div>
          {user === "admin" && (
            <Link className="btn blue__btn" to="/notifications">
              {" "}
              Add New Notice
            </Link>
          )}
        </div>
      </div>

      {notices.length > 0 ? (
        <>
          {notices.slice(0, max).map((notice) => (
            <div key={notice._id}>
              <Notice
                description={getTrimString(notice?.description, 100)}
                date={notice?.date}
                title={notice?.title}
                id={notice?._id}
                createdBy={notice?.createdBy}
                createdAt={notice?.createdAt}
              />
              <hr />
            </div>
          ))}{" "}
          {length > 5 && (
            <Link to="/notifications#notifications">View More</Link>
          )}
        </>
      ) : (
        <h5 className="text-center my-3 text-danger">No Notice yet</h5>
      )}
    </div>
  );
}

export default NoticeBoard;
