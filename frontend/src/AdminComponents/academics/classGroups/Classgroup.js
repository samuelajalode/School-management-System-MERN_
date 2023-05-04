import React, { useState, useEffect } from "react";
import ClassgroupTable from "../../shared/ListTable";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import AddClassgroup from "./AddClassGroup";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDispatch } from "react-redux";
import { setfeesType } from "../../../store/slices/schoolSlice";
import Loading from "../../../Loading";

const tableHeadings = [
  { id: "createdAt", name: "Created At" },
  { id: "name", name: "Name" },
];

function Classgroup() {
  const [loading, setloading] = useState(false);
  const [classgroup, setclassgroup] = useState([]);
  const [name, setname] = useState("");
  const [storedata, setstoredata] = useState([]);
  const [addLoading, setaddLoading] = useState(false);
  const [searchQuery, setsearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setloading(true);
    axios.get("/fees").then((res) => {
      setclassgroup(res.data);
      console.log(res.data);
      setstoredata(res.data);
      setloading(false);
    });
  }, []);

  const handleDelete = (id) => {
    const ans = window.confirm("are you sure you want to delete");
    if (ans) {
      axios.delete(`/fees/delete/${id}`).then(async (res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        await axios.post("/activitylog/create", {
          activity: ` class group was ${id} deleted`,
          user: "admin",
        });
        setclassgroup(classgroup.filter((e) => e._id !== id));
        dispatch(setfeesType(classgroup.filter((e) => e._id !== id)));
      });
    }
  };

  const handleAdd = () => {
    setaddLoading(true);
    axios
      .post("/fees/create", { name })
      .then(async (res) => {
        setaddLoading(false);
        setclassgroup([res.data.docs, ...classgroup]);
        successAlert("Successfully created");
        dispatch(
          setfeesType([...classgroup, { name, code: res.data.docs?.code }])
        );
        setname("");
        await axios.post("/activitylog/create", {
          activity: `new class group ${name}`,
          user: "admin",
        });
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
        <AddClassgroup
          name={name}
          setname={setname}
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
        <ClassgroupTable
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

export default Classgroup;
