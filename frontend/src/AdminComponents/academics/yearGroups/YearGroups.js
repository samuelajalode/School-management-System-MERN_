import React, { useState, useEffect } from "react";
import YearGoupTable from "../../shared/ListTable";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import AddYearGroup from "./AddYearGroup";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDispatch } from "react-redux";
import { setfeesType, setYeargroup } from "../../../store/slices/schoolSlice";
import Loading from "../../../Loading";

const tableHeadings = [
  { id: "createdAt", name: "Created At" },
  { id: "name", name: "Year Group" },
  { id: "year", name: "Year" },
];

function Yeargroup() {
  const [loading, setloading] = useState(false);
  const [classgroup, setclassgroup] = useState([]);
  const [name, setname] = useState("");
  const [storedata, setstoredata] = useState([]);
  const [addLoading, setaddLoading] = useState(false);
  const [year, setyear] = useState("");
  const [searchQuery, setsearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setloading(true);
    axios.get("/yeargroup").then((res) => {
      setclassgroup(res.data);
      console.log(res.data);
      setstoredata(res.data);
      setloading(false);
    });
  }, []);

  const handleDelete = (id) => {
    const ans = window.confirm("are you sure you want to delete");
    if (ans) {
      axios.delete(`/yeargroup/delete/${id}`).then((res) => {
        console.log(res.data);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setclassgroup(classgroup.filter((e) => e._id !== id));
        dispatch(setYeargroup(classgroup.filter((e) => e._id !== id)));
      });
    }
  };

  const handleAdd = () => {
    setaddLoading(true);
    axios
      .post("/yeargroup/create", { name, year })
      .then((res) => {
        setaddLoading(false);
        setclassgroup([res.data.doc, ...classgroup]);
        successAlert("Successfully created");
        dispatch(
          setYeargroup([...classgroup, { name, code: res.data.doc?.code }])
        );
        setname("");
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Failed to add");
        setaddLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let newClasses = [];
    if (searchQuery) {
      newClasses = storedata.filter((i) =>
        i?.name.toLowerCase().includes(searchQuery?.toLowerCase())
      );
    }
    setclassgroup(newClasses);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setclassgroup(storedata);
    setsearchQuery("");
  };

  return (
    <div className="row">
      {loading && <Loading />}
      <div className="col-sm-6">
        <AddYearGroup
          name={name}
          setname={setname}
          year={year}
          setyear={setyear}
          loading={addLoading}
          onSubmit={handleAdd}
        />
      </div>
      <div className="col-sm-6">
        <div className="content__container">
          <div className="d-flex justify-content-between">
            <h3>Class Groups</h3>
            <form onSubmit={handleReset} className="d-flex">
              <input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setsearchQuery(e.target.value)}
                type="text"
                className="form-control"
              />
              {searchQuery && <CancelIcon onClick={handleReset} />}
            </form>
          </div>
        </div>
        <YearGoupTable
          handleDelete={handleDelete}
          data={classgroup}
          isEdit={true}
          handleSearch={handleSearch}
          tableHeader={tableHeadings}
        />
      </div>
    </div>
  );
}

export default Yeargroup;
