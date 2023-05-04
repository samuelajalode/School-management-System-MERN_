import React, { useState, useEffect } from "react";
import ListTable from "../../shared/ListTable";
import { useHistory, Link } from "react-router-dom";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";

function Banking() {
  const history = useHistory();
  const [loading, setloading] = useState(false);
  const [banks, setbanks] = useState([]);

  useEffect(() => {
    axios.get("/banking").then((res) => {
      setbanks(res.data);
    });
  }, []);

  const tableHeadings = [
    { id: "bankName", name: "Bank" },
    { id: "accountName", name: "Account Name" },
    { id: "accountNumber", name: "Account Number" },
    { id: "balance", name: "Balance" },
  ];

  const handleEdit = (id) => {
    history.push(`/finance/banking/transaction/${id}`);
  };

  const handleDelete = (id) => {
    const ans = window.confirm(
      "are you sure you want to delete banking details"
    );
    if (ans) {
      //delete
      axios.delete(`/banking/delete/${id}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("Deleted");
        setbanks(banks.filter((e) => e._id !== id));
      });
    }
  };

  return (
    <div className="banking__container">
      <div className="d-flex justify-content-end">
        <Link to="/finance/banking/add">Add New Bank</Link>
      </div>
      <h3>Banking Details</h3>
      <ListTable
        data={banks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
        tableHeader={tableHeadings}
      />
    </div>
  );
}

export default Banking;
