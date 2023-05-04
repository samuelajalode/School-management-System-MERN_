import React, { useState } from "react";
import { useSelector } from "react-redux";
import Letter from "./Letter";
import { selectStaff } from "../../../store/slices/schoolSlice";
import Search from "./Search";
import axios from "../../../store/axios";
import { errorAlert, getYearsPast, currentCurrency } from "../../../utils";
import ViewAdvice from "./ViewAdvice";

function Advice() {
  const [salutations, setsalutations] = useState("The Manager");
  const [subject, setsubject] = useState("Staff Bank Advice Report");
  const [year, setyear] = useState("");
  const [month, setmonth] = useState("");
  const [bank, setbank] = useState("");
  const years = getYearsPast(10);
  const teachers = useSelector(selectStaff);
  const [body, setbody] = useState(
    "We attached herewith cheque No {cheque_number_here} {bank_name_here}, and amount of GH¢ 0.00 ( ) being salaries for March, 2021 in respect of the names below."
  );
  const [author, setauthor] = useState("The Accountant");
  const [staff, setstaff] = useState({});
  const [loading, setloading] = useState(false);
  const [showLetter, setshowLetter] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedyear, setselectedyear] = useState("");
  const [selectedmonth, setselectedmonth] = useState("");
  const [selectedbank, setselectedbank] = useState("");
  const [salary, setsalary] = useState("");

  const getStaff = (e) => {
    setbank(e.target.value);
  };

  const onSearch = () => {
    if (!year) {
      return errorAlert("Year is required");
    }
    if (!month) {
      return errorAlert("Month is required");
    }
    if (!bank) {
      return errorAlert("Bank is required");
    }
    setloading(true);
    axios.get(`/teachers/${bank}`).then(async (res) => {
      let salary = await axios.get(`/payrow/${res.data.teacher?.position}`);
      setloading(false);
      setshowLetter(true);
      setstaff(res.data.teacher);
      setselectedmonth(month);
      setselectedyear(year);
      setsalary(salary.data.docs.salary);
      setselectedbank(res.data.teacher?.bank);
    });
  };

  return (
    <div>
      <h3 className="mb-2">Bank Advice</h3>
      <div className="content__container mb-3">
        <Search
          year={year}
          setyear={setyear}
          bank={bank}
          setbank={getStaff}
          month={month}
          teachers={teachers}
          setmonth={setmonth}
          years={years}
          loading={loading}
          onSearch={onSearch}
        />
      </div>
      {showLetter && (
        <>
          <Letter
            salutations={salutations}
            setsalutations={setsalutations}
            setsubject={setsubject}
            subject={subject}
            body={body}
            staff={staff}
            salary={salary}
            month={selectedmonth}
            bank={selectedbank}
            year={selectedyear}
            setbody={setbody}
            author={author}
            setauthor={setauthor}
            currentCurrency={currentCurrency}
          />

          {staff && (
            <div className="text-center">
              <button onClick={() => setOpen(true)} className="btn blue__btn">
                View / Print Report
              </button>
            </div>
          )}
        </>
      )}
      <ViewAdvice
        salutations={salutations}
        month={selectedmonth}
        year={selectedyear}
        staff={staff}
        subject={subject}
        open={open}
        body={body}
        salary={salary}
        author={author}
        currentCurrency={currentCurrency}
        setOpen={setOpen}
      />
    </div>
  );
}

export default Advice;
