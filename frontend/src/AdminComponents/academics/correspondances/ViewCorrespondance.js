import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import axios from "../../../store/axios";
import { getImgSrc } from "../../../utils";
import PrintIcon from "@material-ui/icons/Print";

function ViewCorrespondance() {
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const [school, setschool] = useState([]);

  useEffect(() => {
    axios.get(`/correspondance/${id}`).then((res) => {
      setdata(res.data.doc);
    });
  }, [id]);

  useEffect(() => {
    axios.get(`/school`).then((res) => {
      let d = res?.data;
      console.log(res);
      setschool(d);
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn blue__btn btn-lg" onClick={handlePrint}>
          <PrintIcon />
          Print
        </button>
      </div>
      <div id="section-to-print" className="content__container p-4 pb-5">
        <div className="text-center">
          {/* <img width="100px" src={getImgSrc(school?.profileUrl)} alt="" /> */}
          <h4>{school?.fullName}</h4>
          <h6>{school?.motto}</h6>
        </div>
        <div className="d-flex justify-content-between">
          <div className="">
            <h6>
              <strong>Our Ref:</strong> {moment().format("D/MM/YYYY")}{" "}
            </h6>
          </div>
          <div className="">
            <h6>
              <strong>Your Ref: </strong> ......................
            </h6>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between mb-4">
          <div>{data?.address}</div>
          <div>{moment(data?.date).format("D/MM/YYYY")}</div>
        </div>
        <div>{data?.salutation}</div>
        <div className="mb-3">
          <h5>
            <strong>{data?.subject}</strong>
          </h5>
        </div>
        <p className="mb-5">{data?.body}</p>

        <div className="mb-3">{data?.closing}</div>
        <div className="mb-3">....................</div>
        <div className="">{data?.signature}</div>
      </div>
    </div>
  );
}

export default ViewCorrespondance;
