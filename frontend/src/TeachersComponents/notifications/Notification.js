import React, { useState, useEffect } from "react";
import Search from "../../AdminComponents/shared/Search";
import Notice from "../../components/dashboard/Notice";
import axios from "../../store/axios";

function NotificationsPage() {
  const [date, setdate] = useState("");
  const [title, settitle] = useState("");
  const [notices, setnotices] = useState([]);
  const [storeData, setstoreData] = useState([]);

  useEffect(() => {
    axios.get("/notification").then((res) => {
      setnotices(res.data);
      setstoreData(res.data);
    });
  }, []);

  const inputFields = [
    {
      type: "text",
      value: title,
      label: "Search by name",
      name: "title",
      onChange: settitle,
    },
    {
      type: "date",
      label: "Search by date",
      value: date,
      name: "date",
      onChange: setdate,
    },
  ];

  const handleReset = (e) => {
    e.preventDefault();
    setnotices(storeData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (title || date) {
      let newNotices = storeData.filter(
        (i) =>
          i.title.toLowerCase().includes(title.toLowerCase()) ||
          i.description.toLowerCase().includes(title.toLowerCase()) ||
          new Date(i.createdAt).toISOString().slice(0, 10) === date
      );
      setnotices(newNotices);
    } else {
      setnotices(storeData);
    }
  };

  return (
    <div className=" notices">
      <div className="mb-5 content__container">
        <h3>Notice Board</h3>
        <Search
          inputFields={inputFields}
          handleReset={handleReset}
          handleSearch={handleSearch}
        />
      </div>
      <div className="notices__container content__container">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <div className="" key={notice._id}>
              <Notice
                description={notice.description}
                date={notice.date}
                title={notice.title}
                id={notice._id}
                isReset={true}
                createdAt={notice?.createdAt}
                createdBy={notice.createdBy}
              />
              <hr />
            </div>
          ))
        ) : (
          <>
            <h6 className="text-danger text-center">There are no notice</h6>
          </>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
