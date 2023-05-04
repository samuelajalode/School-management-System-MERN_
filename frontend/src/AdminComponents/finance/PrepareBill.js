import React, { useState, useEffect } from "react";
import ListTable from "./billPayment/PaymentTable";
import Search from "../shared/Search";
import { useSelector } from "react-redux";
import { selectClasses } from "../../store/slices/schoolSlice";
import axios from "../../store/axios";
import { Link, useHistory } from "react-router-dom";
import { errorAlert, currentCurrency } from "../../utils";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "userID", name: "Student ID" },
  { id: "paymentMethod", name: "Payment Method" },
  { id: "bank", name: "Bank" },
  { id: "chequeNumber", name: "Cheque Number" },
  { id: "amount", name: `Amount (${currentCurrency()})` },
];

function PrepareBill() {
  const [data, setdata] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [classID, setclass] = useState("");
  const [status, setstatus] = useState("");
  const classes = useSelector(selectClasses);
  const history = useHistory();

  useEffect(() => {
    axios.get("/transactions/students/fees").then((res) => {
      setdata(res.data);
      setstoreData(res.data);
    });
  }, []);

  const inputFields = [
    {
      label: "Search by Student ID",
      type: "text",
      value: classID,
      name: "student",
      onChange: setclass,
    },
    {
      label: "Search by Status",
      type: "select",
      value: status,
      onChange: setstatus,
      options: [
        { id: "all", name: "All Students" },
        { id: "day", name: "Day Students" },
        { id: "fresh-day", name: "Fresh day Students" },
        { id: "border", name: "Border Students" },
        { id: "fresh-border", name: "Fresh-border Border Students" },
      ],
    },
  ];

  const handleDelete = (id) => {
    axios.delete(`/transactions/delete/${id}`).then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
      }
      setdata(data.filter((e) => e._id !== id));
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let newData = [];
    if (classID) {
      newData = storeData.filter((i) =>
        i?.userID?.toLowerCase().includes(classID?.toLowerCase())
      );
    }
    if (status) {
      newData = storeData.filter((i) =>
        i?.status?.toLowerCase().includes(status?.toLowerCase())
      );
    }
    setdata(newData);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setdata(storeData);
    setstatus("");
  };

  const handleEdit = (id) => {
    history.push(`/finance/transactions/receipt/${id}`);
  };

  return (
    <div>
      <div className="float-right mb-5">
        <Link className="btn blue__btn" to="/finance/students/fees">
          Make A Payment
        </Link>
      </div>
      <h3 className=" mb-5">Students Fees Transactions</h3>

      <Search
        title="Filter Students"
        handleReset={handleReset}
        handleSearch={handleSearch}
        inputFields={inputFields}
      />
      <ListTable
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        tableHeader={tableHeader}
        isEdit={true}
      />
    </div>
  );
}

export default PrepareBill;
