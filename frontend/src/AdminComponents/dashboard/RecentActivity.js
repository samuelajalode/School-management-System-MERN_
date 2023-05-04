import React, { useEffect, useState } from "react";
import axios from "../../store/axios";
import { timeStamp } from "../../utils";

function RecentActivity() {
  const [activities, setactivities] = useState([]);

  useEffect(() => {
    axios.get("/activitylog").then((res) => setactivities(res.data));
  }, []);

  return (
    <div className="content__container activities__container">
      <h3>Recent Activities</h3>
      <div>
        {activities.length > 0 ? (
          activities.map((e) => (
            <div key={e._id}>
              <div className="d-flex justify-content-between">
                <div>
                  <i>{e?.user}</i>
                </div>
                <div>
                  <small>
                    <i>{timeStamp(e.createdAt)}</i>
                  </small>
                </div>
              </div>
              <p>{e?.activity}</p>
              <hr />
            </div>
          ))
        ) : (
          <div className="">No activities yet</div>
        )}
      </div>
    </div>
  );
}

export default RecentActivity;
