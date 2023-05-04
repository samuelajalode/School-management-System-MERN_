import React, { useState, useEffect } from "react";
import Table from "./Table";
import AddIcon from "@material-ui/icons/Add";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import EditInventory from "./EditInventory";
import axios from "../../../store/axios";
import { successAlert, errorAlert, currentCurrency } from "../../../utils";
import { useHistory } from "react-router-dom";

const tableHeader = [
  { id: "name", name: "Name" },
  { id: "description", name: "Description" },
  { id: "price", name: `Price (${currentCurrency()})` },
  { id: "quantity", name: "Quantity" },
];

function Inventory() {
  const [inventory, setinventory] = useState([]);
  const [openAdd, setopenAdd] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [openInventory, setopenInventory] = useState(false);
  const history = useHistory();

  const [name, setname] = useState("");
  const [unit, setunit] = useState("");
  const [qty, setqty] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);
  const [editID, seteditID] = useState("");

  const [newQty, setnewQty] = useState("");

  useEffect(() => {
    axios.get("/store/items").then((res) => {
      setinventory(res.data);
    });
  }, []);

  const handleAddClose = (data) => {
    setopenAdd(false);
    if (data) {
      setinventory([data, ...inventory]);
    }
  };

  const onEdit = () => {
    setloading(true);
    axios
      .put(`/store/items/update/${editID}`, {
        name,
        unit,
        quantity: qty,
        price,
        description,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setname("");
        setunit("");
        setqty("");
        setprice("");
        setdescription("");
        successAlert("Item Successfully Edited");
        setopenEdit(false);
        // let oldData  = inventory.findIndex(e => e._id === editID);
        let newData = inventory.map((obj) =>
          obj._id === editID ? { ...res.data.doc } : obj
        );
        setinventory(newData);
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Failed");
        setloading(false);
      });
  };

  const handleEdit = (id) => {
    setopenEdit(true);
    let doc = inventory.find((e) => e._id === id);
    setname(doc?.name);
    setunit(doc?.unit);
    setqty(doc?.quantity);
    setdescription(doc?.description);
    setprice(doc?.price);
    seteditID(id);
  };

  const handleInventory = (id) => {
    setopenInventory(true);
    seteditID(id);
    let doc = inventory.find((e) => e._id === id);
    setname(doc?.name);
    setqty(doc?.quantity);
  };

  const handleDelete = (id) => {
    axios.delete(`/store/items/delete/${id}`).then((res) => {
      if (res.data.error) {
        return errorAlert(res.data.error);
      }
      setinventory(inventory.filter((i) => i._id !== id));
    });
  };

  const handleChangeInventory = () => {
    setloading(true);
    axios
      .put(`/store/items/update/inventory/${editID}`, {
        quantity: newQty,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setname("");
        setqty("");
        setnewQty("");
        successAlert("Item Successfully Edited");
        setopenInventory(false);
        let newData = inventory.map((obj) =>
          obj._id === editID ? { ...res.data.doc } : obj
        );
        setinventory(newData);
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Failed");
        setloading(false);
      });
  };

  return (
    <div>
      <h3>Store Inventory</h3>
      <div className="mb-3 d-flex justify-content-between content__container">
        <button onClick={() => setopenAdd(true)} className="btn blue__btn">
          <AddIcon /> Add Item
        </button>
        <form action="">
          <input className="form-control" type="text" placeholder="Search..." />
        </form>
      </div>
      <Table
        data={inventory}
        isItems={true}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleManage={handleInventory}
        tableHeader={tableHeader}
      ></Table>

      <AddItem open={openAdd} setOpen={handleAddClose} />
      <EditItem
        price={price}
        loading={loading}
        setprice={setprice}
        setdescription={setdescription}
        description={description}
        quantity={qty}
        setquantity={setqty}
        name={name}
        setname={setname}
        onSubmit={onEdit}
        unit={unit}
        setunit={setunit}
        open={openEdit}
        setOpen={setopenEdit}
      />
      <EditInventory
        newQty={newQty}
        qty={qty}
        name={name}
        onSubmit={handleChangeInventory}
        setnewQty={setnewQty}
        open={openInventory}
        setOpen={setopenInventory}
      />
    </div>
  );
}

export default Inventory;
