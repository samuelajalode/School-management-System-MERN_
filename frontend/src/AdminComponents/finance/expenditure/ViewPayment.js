import React, { useState, useEffect } from "react";
import ListTable from "../../shared/ListTable";
import { Link } from "react-router-dom";
import axios from "../../../store/axios";
import { getTrimString, errorAlert, currentCurrency } from "../../../utils";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "category", name: "Category" },
  { id: "type", name: "Type" },
  { id: "description", name: "Description" },
  { id: "amount", name: `Amount (${currentCurrency()})` },
  { id: "paymentMethod", name: "Payment Type" },
];

function ViewPayment() {
  const [expenditures, setexpenditures] = useState([]);

  useEffect(() => {
    axios.get("/transactions").then((res) => {
      let data = res.data.map((e) => {
        return {
          ...e,
          description: getTrimString(e.description, 50),
        };
      });
      setexpenditures(data);
    });
  }, []);

  const handleEdit = (id) => {};

  const handleDelete = (id) => {
    axios.delete(`/transactions/delete/${id}`).then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
      }
      setexpenditures(expenditures.filter((e) => e._id !== id));
    });
  };

  return (
    <div>
      <h3 className="">Transactions</h3>
      <div className="float-right mb-4">
        <Link className="btn blue__btn mr-4" to="/finance/transactions/income">
          Record An Income
        </Link>
        <Link className="btn btn-danger" to="/finance/transactions/expenditure">
          Make a Payment
        </Link>
      </div>
      <div className="mt-5">
        <ListTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isEdit={true}
          data={expenditures}
          tableHeader={tableHeader}
        />
      </div>
    </div>
  );
}

export default ViewPayment;
