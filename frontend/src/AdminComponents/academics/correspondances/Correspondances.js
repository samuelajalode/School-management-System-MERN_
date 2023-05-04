import React, { useState, useEffect } from "react";
import CorrespondanceTable from "./CorrespndanceTable";
import Search from "../../shared/Search";
import { Link } from "react-router-dom";
import axios from "../../../store/axios";
import { useHistory } from "react-router-dom";
import { errorAlert } from "../../../utils";

const tableHeadings = [
  { id: "createdAt", name: "Created At" },
  { id: "subject", name: "Subject" },
  { id: "signature", name: "Created By" },
];

function Corresponses() {
  const [name, setname] = useState("");
  const [correspondance, setcorrespondance] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [loading, setloading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setloading(true);
    axios.get("/correspondance").then((res) => {
      setloading(false);
      let data = res.data;
      setcorrespondance(data);
      setstoreData(data);
    });
  }, []);

  const inputFields = [
    {
      type: "text",
      label: "Search...",
      value: name,
      name: "name",
      onChange: setname,
    },
  ];

  const handleDeleteCorrespondance = (id) => {
    const ans = window.confirm("are you sure you want to delete");
    if (ans) {
      axios.delete(`/correspondance/delete/${id}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setcorrespondance(correspondance.filter((course) => course._id !== id));
      });
    }
  };

  const handleEditCorrespondance = (id) => {
    history.push(`/academics/correspondance/edit/${id}`);
  };

  const handleViewCorrespondance = (id) => {
    history.push(`/academics/correspondance/view/${id}`);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setname("");
    setcorrespondance(storeData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let newcorrespondance = [];
    if (name) {
      newcorrespondance = storeData.filter(
        (i) =>
          i?.name.toLowerCase().includes(name?.toLowerCase()) ||
          i?.subject.toLowerCase().includes(name?.toLowerCase())
      );
    }
    setcorrespondance(newcorrespondance);
  };

  return (
    <div>
      <div className="row">
        <Search
          title="Correspondances"
          loading={loading}
          inputFields={inputFields}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
      </div>
      <div className="d-flex justify-content-end mb-3">
        <Link
          to="/academics/correspondance/add"
          className="btn btn-outline-info btn__lg"
        >
          Add New Correspondance
        </Link>
      </div>
      <CorrespondanceTable
        handleEdit={handleEditCorrespondance}
        handleSearch={handleSearch}
        handleDelete={handleDeleteCorrespondance}
        data={correspondance}
        handleViewCorrespondance={handleViewCorrespondance}
        tableHeader={tableHeadings}
      />
    </div>
  );
}

export default Corresponses;
