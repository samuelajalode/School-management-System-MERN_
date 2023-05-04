import React, { useState, useEffect } from "react";
import axios from "../../../store/axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import Loading from "../../../Loading";
import { getImgSrc, currentCurrency } from "../../../utils";

function Receipt() {
  const [transaction, settransaction] = useState({});
  const [loading, setloading] = useState(false);
  const [school, setschool] = useState({});
  const { id } = useParams();

  useEffect(() => {
    setloading(true);
    axios.get(`/store/sales/${id}`).then((res) => {
      console.log(res);
      setloading(false);
      settransaction(res.data.doc);
    });
  }, [id]);

  useEffect(() => {
    setloading(true);
    axios.get(`/school`).then((res) => {
      console.log(res);
      setloading(false);
      setschool(res.data);
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button onClick={handlePrint} className="btn blue__btn">
          Print
        </button>
      </div>
      <div className="content__container" id="section-to-print">
        {loading && <Loading />}
        <h3>Sales Reciept</h3>
        <div className="text-center">
          <img
            src={getImgSrc(school?.profileUrl)}
            width="100px"
            alt=""
            srcset=""
          />
          <h4>{school?.fullName}</h4>
          <h6>{school?.motto}</h6>
        </div>
        <div>
          <strong>
            Date: {moment(transaction.createdAt).format("D MMMM YYYY")}
          </strong>{" "}
          <br />
          <strong>Cashier: {transaction.seller || "-"}</strong>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item</th>
              <th scope="col">Rate</th>
              <th scope="col">Qty</th>
              <th scope="col">Amount ({currentCurrency()})</th>
            </tr>
          </thead>
          <tbody>
            {transaction.items &&
              transaction.items?.map((item, i) => (
                <tr key={item._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{item?.name}</td>
                  <td>{item?.rate}</td>
                  <td>{item?.qty}</td>
                  <td>{item?.amount}</td>
                </tr>
              ))}
            <tr>
              <td colSpan={4}></td>
              <td>
                <div className="d-flex flex-column">
                  <strong>
                    Amount Paid: ({currentCurrency()})
                    {transaction?.amountPaid || "0"}
                  </strong>
                  <strong>
                    Total Cost: ({currentCurrency()})
                    {transaction?.totalCost || "0"}{" "}
                  </strong>
                  <strong>
                    Change: ({currentCurrency()})
                    {transaction?.amountPaid - transaction?.totalCost || "0"}
                  </strong>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Receipt;
