import React, { useState, useEffect } from "react";
import Search from "../shared/Search";
import TableList from "../shared/ListTable";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../store/axios";
import { selectClasses } from "../../store/slices/schoolSlice";
import { currentCurrency } from "../../utils";

function CanteenPayment() {
  const [classID, setclass] = useState("");
  const [term, setterm] = useState("");
  const classes = useSelector(selectClasses);
  const [payments, setpayments] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [members, setmembers] = useState([]);

  useEffect(() => {
    axios.get("/canteen/payments").then((res) => {
      console.log(res.data);
      setpayments(res.data);
      setstoreData(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/canteen/members").then((res) => {
      console.log(res.data);
      if (res.data.error) {
        return setmembers([]);
      }

      setmembers(
        res.data.map((i) => {
          return {
            id: i.memberID,
            name: i.name + i.memberID,
          };
        })
      );
    });
  }, []);

  const tableHeader = [
    { id: "memberID", name: "Canteen ID" },
    { id: "name", name: " Member's Name" },
    { id: "amount", name: `Amount Paid (${currentCurrency()})` },
    { id: "date", name: "Date" },
  ];

  const inputFields = [
    {
      type: "select",
      label: "Search by  Member ID",
      name: "class",
      value: classID,
      onChange: setclass,
      options: members,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    let newPayments = [];
    if (classID) {
      newPayments = storeData.filter((i) =>
        i?.memberID.toLowerCase().includes(classID?.toLowerCase())
      );
    }

    setpayments(newPayments);
  };

  const handleReset = () => {
    setpayments(storeData);
  };

  return (
    <div>
      <Search
        handleSearch={handleSearch}
        title="Canteen Payments"
        inputFields={inputFields}
        handleReset={handleReset}
      />
      <div className="content__container">
        <div className="d-flex justify-content-end">
          <Link
            to="/canteen/members/register"
            className="btn blue__btn mb-3 mx-2"
          >
            Add Canteen Member
          </Link>
          <Link to="/canteen/members" className="btn blue__btn mb-3  mx-2">
            View All Members
          </Link>
          <Link className="btn blue__btn mb-3 mx-2" to="/canteen/payments/add">
            Make Payment
          </Link>
        </div>
        <TableList noActions={true} tableHeader={tableHeader} data={payments} />
      </div>
    </div>
  );
}

export default CanteenPayment;
