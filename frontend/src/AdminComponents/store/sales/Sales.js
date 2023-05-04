import React, { useState, useEffect } from "react";
import Table from "./SalesTable";
import AddSales from "./AddSales";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import { useHistory } from "react-router-dom";

function Sales() {
  const [data, setdata] = useState([]);
  const [open, setopen] = useState(false);
  const [name, setname] = useState("");
  const [amount, setamount] = useState(0);
  const [items, setitems] = useState([]);
  const [loading, setloading] = useState(false);
  const history = useHistory();
  const [buyitems, setbuyitems] = useState([
    {
      qty: 0,
      rate: 0,
      discount: 0.0,
      amount: 0,
      name: "",
      id: 0,
      itemID: "",
    },
  ]);

  useEffect(() => {
    axios.get("/store/sales").then((res) => {
      setdata(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/store/items").then((res) => {
      setitems(res.data);
    });
  }, []);

  const calculateAmount = (rate, discount, qty) => {
    if (rate || discount || qty) {
      let amnt = Number(rate) * Number(qty);
      let discountAmount = Number(discount) * amnt;
      return (amnt - discountAmount).toFixed(2);
    }
    return 0;
  };

  const handleChangeDiscount = (e, i) => {
    console.log(e);
    setbuyitems(
      buyitems.map((obj) => {
        console.log(obj);
        return obj.id === i
          ? {
              discount: Number(e),
              name: obj.name,
              rate: obj.rate,
              qty: obj.qty,
              amount: calculateAmount(obj.rate, e, obj.qty),
              id: i,
              itemID: obj.itemID,
            }
          : obj;
      })
    );
  };

  const handleChangeQty = (e, i) => {
    console.log(e, i);
    setbuyitems(
      buyitems.map((obj) =>
        obj.id === i
          ? {
              qty: Number(e),
              amount: calculateAmount(obj.rate, obj.discount, e),
              name: obj.name,
              rate: obj.rate,
              discount: obj.discount,
              itemID: obj.itemID,
              id: i,
            }
          : obj
      )
    );
  };

  const handleSetitem = (id, index) => {
    let item = items.find((e) => e._id === id);
    setbuyitems(
      buyitems.map((obj) => {
        return obj.id === index
          ? {
              name: item.name,
              rate: item.price,
              itemID: item._id,
              amount: item.price,
              discount: 0.0,
              id: index,
              qty: 1,
            }
          : obj;
      })
    );
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    setbuyitems([
      ...buyitems,
      {
        qty: 0,
        rate: 0,
        discount: 0.0,
        amount: 0,
        name: "",
        id: buyitems.length,
        itemID: "",
      },
    ]);
  };

  const totalprice = buyitems.reduce((sum, obj) => {
    return sum + Number(obj.amount);
  }, 0);

  const handleAddSale = (e) => {
    e.preventDefault();
    if (!name) {
      return errorAlert("please select student");
    }
    setloading(true);
    axios
      .post("/store/sales/create", {
        amountPaid: amount,
        totalCost: totalprice,
        name,
        items: buyitems,
        seller: "admin",
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("payment successfully added");

        history.push(`/store/sales/receipt/${res.data.doc?._id}`);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
      });
  };

  console.log(buyitems);
  return (
    <div>
      <div className="mb-5 d-flex justify-content-between content__container ">
        <div>
          <button onClick={() => setopen(true)} className="btn blue__btn">
            New Sale
          </button>
        </div>
        <form action="">
          <input
            placeholder="Search...."
            className="form-control"
            type="text"
          />
        </form>
      </div>

      <Table data={data} />

      <AddSales
        student={name}
        setstudent={setname}
        amount={amount}
        setamount={setamount}
        buyitems={buyitems}
        handleChangeQty={handleChangeQty}
        handleAddItem={handleAddItem}
        items={items}
        open={open}
        loading={loading}
        handleAddSale={handleAddSale}
        totalprice={totalprice}
        handleChangeDiscount={handleChangeDiscount}
        handleSetitem={handleSetitem}
        setOpen={setopen}
      />
    </div>
  );
}

export default Sales;
