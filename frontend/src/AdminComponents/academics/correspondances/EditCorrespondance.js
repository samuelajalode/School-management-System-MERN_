import React, { useState, useEffect } from "react";
import EditForm from "./CorrespondanceForm";
import { useParams } from "react-router-dom";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import Loading from "../../../Loading";
import moment from "moment";

function EditCorrespondance() {
  const [address, setaddress] = useState("");
  const [subject, setsubject] = useState("");
  const [body, setbody] = useState("");
  const [closing, setclosing] = useState("");
  const [signature, setsignature] = useState("");
  const [date, setdate] = useState("");
  const [salutation, setsalutation] = useState("");
  const [loading, setloading] = useState(false);
  const [editLoading, seteditLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setloading(true);
    axios.get(`/correspondance/${id}`).then((res) => {
      let doc = res.data.doc;
      console.log(res);
      setloading(false);
      if (doc) {
        setaddress(doc?.address);
        setsubject(doc?.subject);
        setbody(doc?.body);
        setclosing(doc?.closing);
        setsignature(doc?.signature);
        setdate(moment(doc?.date).format("YYYY-MM-D"));
        setsalutation(doc?.salutation);
      }
    });
  }, [id]);

  const handleEdit = () => {
    seteditLoading(true);
    axios
      .put(`/correspondance/update/${id}`, {
        address,
        subject,
        body,
        closing,
        signature,
        date,
        salutation,
      })
      .then((res) => {
        seteditLoading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        successAlert("Correspondance changes successsfully saved");
      })
      .catch((err) => {
        console.log(err);
        seteditLoading(false);
        errorAlert("Failed");
      });
  };

  return (
    <div className="content__container">
      {loading && <Loading />}
      <h3>Edit Correspondance</h3>
      <EditForm
        address={address}
        setaddress={setaddress}
        body={body}
        setbody={setbody}
        closing={closing}
        setclosing={setclosing}
        signature={signature}
        setsignature={setsignature}
        date={date}
        loading={editLoading}
        setdate={setdate}
        setsalutation={setsalutation}
        salutation={salutation}
        subject={subject}
        setsubject={setsubject}
        handleFunc={handleEdit}
      />
    </div>
  );
}

export default EditCorrespondance;
