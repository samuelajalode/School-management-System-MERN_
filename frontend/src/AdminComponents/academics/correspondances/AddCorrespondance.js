import React, { useState } from "react";
import AddForm from "./CorrespondanceForm";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";

function AddCorrespondance() {
  const [address, setaddress] = useState("");
  const [subject, setsubject] = useState("");
  const [body, setbody] = useState("");
  const [closing, setclosing] = useState("");
  const [signature, setsignature] = useState("");
  const [date, setdate] = useState("");
  const [salutation, setsalutation] = useState("");
  const [loading, setloading] = useState(false);

  const handleAdd = () => {
    setloading(true);
    axios
      .post("/correspondance/create", {
        address,
        subject,
        body,
        closing,
        signature,
        date,
        salutation,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        successAlert("Correspondance successsfully created");
        setaddress("");
        setsubject("");
        setbody("");
        setclosing("");
        setsignature("");
        setdate("");
        setsalutation("");
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Failed");
      });
  };

  return (
    <div className="content__container">
      <h3 className="mb-5">New Correspondance</h3>
      <AddForm
        address={address}
        setaddress={setaddress}
        body={body}
        setbody={setbody}
        closing={closing}
        setclosing={setclosing}
        signature={signature}
        setsignature={setsignature}
        date={date}
        loading={loading}
        setdate={setdate}
        setsalutation={setsalutation}
        salutation={salutation}
        subject={subject}
        setsubject={setsubject}
        handleFunc={handleAdd}
      />
    </div>
  );
}

export default AddCorrespondance;
