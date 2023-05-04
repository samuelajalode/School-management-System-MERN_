import React, { useState, useEffect } from "react";
import ListTable from "../billPayment/PaymentTable";
import Search from "../../shared/Search";
import { useSelector } from "react-redux";
import { selectStaff } from "../../../store/slices/schoolSlice";
import axios from "../../../store/axios";
import { Link } from "react-router-dom";
import { errorAlert, currentCurrency } from "../../../utils";
import { useHistory } from "react-router-dom";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "userID", name: "Staff ID" },
  { id: "name", name: "Name" },
  { id: "bank", name: "Bank" },
  { id: "accountNumber", name: "Account Number" },
  { id: "amount", name: `Total Salary (${currentCurrency()})` },
];

function PayrowAll() {
  const [data, setdata] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [status, setstatus] = useState("");
  const staff = useSelector(selectStaff);
  const history = useHistory();

  useEffect(() => {
    axios.get("/transactions/staff/pay").then((res) => {
      console.log(res.data);
      let payrowStaff = res.data.map((e) => {
        return {
          ...e,
          name:
            staff.find((i) => i.userID === e.userID)?.name +
            " " +
            staff.find((i) => i.userID === e.userID)?.surname,
        };
      });
      setdata(payrowStaff);
      setstoreData(payrowStaff);
    });
  }, [staff]);

  const inputFields = [
    {
      label: "Search by Staff Member",
      type: "select",
      value: status,
      onChange: setstatus,
      options:
        staff &&
        staff.map((e) => {
          return {
            id: e?.userID,
            name: e?.name + " " + e?.surname + " -" + e?.userID,
          };
        }),
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
    if (status) {
      newData = storeData.filter((i) =>
        i?.userID?.toLowerCase().includes(status?.toLowerCase())
      );
    }
    setdata(newData);
  };

  const handleEdit = (id) => {
    axios.get(`/transactions/${id}`).then(async (res) => {
      history.push(`/finance/staff/payrow/payslip/${res.data?.pay?.userID}`);
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setdata(storeData);
    setstatus("");
  };

  return (
    <div>
      <div className="float-right mb-5">
        <Link className="btn blue__btn" to="/finance/staff/payrow/pay">
          Staff Salary Payment
        </Link>
      </div>
      <h3 className=" mb-5">Staff Salary Transactions</h3>
      <Search
        title="Filter Staff"
        handleSearch={handleSearch}
        handleReset={handleReset}
        inputFields={inputFields}
      />
      <ListTable
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        noData="No salary payments yet"
        tableHeader={tableHeader}
      />
    </div>
  );
}

export default PayrowAll;
