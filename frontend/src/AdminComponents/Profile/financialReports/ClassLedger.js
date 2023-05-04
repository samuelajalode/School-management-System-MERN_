import React, { useState, useEffect } from "react";
import ListTable from "../../shared/ListTable";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectClasses } from "../../../store/slices/schoolSlice";
import moment from "moment";
import { selectUser } from "../../../store/slices/userSlice";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PrintIcon from "@material-ui/icons/Print";
import ExcelButton from "../../../components/tables/ExcelExport";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "userID", name: "Student ID" },
  { id: "name", name: "Name" },
  { id: "type", name: "Student Type" },
  { id: "fees", name: "Total Fees" },
  { id: "amount", name: "Amount Paid" },
  { id: "balance", name: "Balance" },
];

let thismonth = moment().month();
let thisyear = moment().year();
let dayOne = moment(`01/${thismonth}/${thisyear}`).format("YYYY-MM-DD");

function ViewPayment() {
  const [expenditures, setexpenditures] = useState([]);
  const [from, setfrom] = useState(dayOne);
  const [to, setto] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setloading] = useState(false);
  const [classID, setclassID] = useState("");
  const classes = useSelector(selectClasses);
  const user = useSelector(selectUser);
  const [fees, setfees] = useState([]);
  const [show, setshow] = useState(false);

  useEffect(() => {
    axios.get("/fees").then((res) => {
      setfees(res.data);
    });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (classID) {
      setloading(true);
      let bal = (u) => {
        let fee = fees.find((z) => z?.code === u?.fees);
        return fee
          ? Object.values(fee[u.status]).reduce(
              (t, v) => Number(t) + Number(v),
              0
            )
          : 0;
      };
      let paidFee = async (id) => {
        await axios
          .get(`/transactions/student/${id}`)
          .then((res) => res.data.reduce((v, i) => v + Number(i.amount), 0));
      };

      await axios
        .get(`/students/class/${classID}`)
        .then((res) => {
          setloading(false);
          setshow(true);
          if (res.data.error) {
            setexpenditures([]);
            return 0;
          }
          let data = res.data?.users?.map((i) => {
            console.log(paidFee(i?.userID));
            console.log(bal(i));
            return {
              userID: i.userID,
              date: i.createdAt,
              name: i.name + " " + i.surname,
              fees: bal(i),
              type: i.status,
              amount: 0,
              balance: bal(i) - 0,
            };
          });
          setexpenditures(data);
        })
        .catch((err) => {
          setloading(false);
        });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h3 className="">Class Ledger Reports</h3>
      <form className="content__container row">
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            Class
          </label>
          <div className="">
            <select
              name="academic-calendar"
              className="form-select"
              value={classID}
              onChange={(e) => setclassID(e.target.value)}
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {classes &&
                classes.map((y) => (
                  <option value={y.classCode} key={y._id}>
                    {y?.classCode}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            From
          </label>
          <div className="å">
            <input
              value={from}
              onChange={(e) => setfrom(e.target.value)}
              type="date"
              className="form-control"
              name="from"
            />
          </div>
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="name" className=" col-form-label">
            To
          </label>
          <div className="">
            <input
              value={to}
              onChange={(e) => setto(e.target.value)}
              type="date"
              className="form-control"
              name="to"
            />
          </div>
        </div>
        <div className="mb-3">
          <button
            onClick={handleSearch}
            disabled={loading}
            type="submit"
            className="btn blue__btn"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Search
          </button>
        </div>
      </form>

      {show && (
        <>
          <div className="mt-5 content__container">
            <div className="text-center">
              <h5>
                <strong>{user?.name}</strong>
              </h5>
              <h5>CLASS LEDGER REPORT</h5>
              <div>Class = {classID}</div>
              <div>
                From {moment(from).format("DD MMMM YYYY")} - To{" "}
                {moment(to).format("DD MMMM YYYY")}
              </div>
            </div>
            <ListTable
              data={expenditures}
              noActions={true}
              tableHeader={tableHeader}
            />
          </div>
          {expenditures.length > 0 && (
            <div className="d-flex justify-content-center mt-3">
              <button onClick={handlePrint} className="btn blue__btn mr-3">
                Print <PrintIcon />
              </button>

              <ExcelButton
                data={expenditures}
                columns={tableHeader}
                btn={
                  <>
                    <InsertDriveFileIcon /> Save
                  </>
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ViewPayment;
