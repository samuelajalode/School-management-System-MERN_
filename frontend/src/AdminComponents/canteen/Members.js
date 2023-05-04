import React, { useEffect, useState } from "react";
import ListTable from "../shared/ListTable";
import axios from "../../store/axios";
import { useHistory } from "react-router-dom";
import CanteenNav from "./CanteenNav";
import { errorAlert } from "../../utils";

function Members() {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const history = useHistory();

  const tableHeader = [
    { id: "memberID", name: " Member ID" },
    { id: "userID", name: "School ID" },
    { id: "name", name: "Name" },
    { id: "role", name: "Type" },
    { id: "paymentMethod", name: "Payment Method" },
  ];

  useEffect(() => {
    axios.get("/canteen").then((res) => {
      setdata(res.data);
    });
  }, []);

  const handleEdit = (id) => {
    history.push(`/canteen/members/edit/${id}`);
  };

  const handleDelete = (id) => {
    let ans = window.confirm("Are you sure you want to delete");
    if (ans) {
      setloading(true);
      axios
        .delete(`/canteen/delete/${id}`)
        .then(() => {
          setloading(false);
          setdata(data.filter((res) => res.memberID !== id));
        })
        .catch((err) => {
          console.log(err);
          errorAlert("something went wrong");
          setloading(false);
        });
    }
  };

  return (
    <div>
      <div className="mb-5">
        <CanteenNav />
      </div>
      <h3 className="mb-3">Canteen Members</h3>
      <ListTable
        data={data}
        isCanteen={true}
        tableHeader={tableHeader}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}

export default Members;
