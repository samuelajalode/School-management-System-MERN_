import React, { useState, useEffect } from "react";
import BankForm from "./BankForm";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import { useParams, Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function EditBank() {
  const [name, setname] = useState("");
  const [bank, setbank] = useState("");
  const [number, setnumber] = useState("");
  const [loading, setloading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/banking/${id}`).then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
        return 0;
      }
      let data = res.data;
      setbank(data.bankName);
      setnumber(data.accountNumber);
      setname(data.accountName);
    });
  }, [id]);

  const handleEdit = () => {
    setloading(true);
    axios
      .put(`/banking/update/${id}`, {
        bankName: bank,
        accountName: name,
        accountNumber: number,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        successAlert("successfully save changes.");
      })
      .catch((err) => {
        console.log(err);
        errorAlert("FAILED");
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Link to={`/finance/banking/transaction/${id}`}>
          Back to Bank Details
          <ArrowForwardIosIcon />
        </Link>
      </div>
      <h3>Edit Bank Details</h3>
      <BankForm
        name={name}
        isEdit={true}
        bank={bank}
        number={number}
        loading={loading}
        setnumber={setnumber}
        setbank={setbank}
        setname={setname}
        onSubmit={handleEdit}
      />
    </div>
  );
}

export default EditBank;
