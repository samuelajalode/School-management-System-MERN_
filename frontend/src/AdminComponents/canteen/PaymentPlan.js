import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axios from "../../store/axios";
import Edit from "./EditPaymentPlan";
import { selectUser } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import { errorAlert, successAlert, currentCurrency } from "../../utils";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CanteenNav from "./CanteenNav";

function PaymentPlan() {
  const user = useSelector(selectUser);
  const [planData, setplanData] = useState({});
  const [plansData, setplansData] = useState([]);
  const [services, setservices] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEditService, setopenEditService] = useState(false);
  const [openAddService, setopenAddService] = useState(false);
  const [title, settitle] = useState("");
  const [editID, seteditID] = useState("");
  const [loading, setloading] = useState(false);

  const [name, setname] = useState({
    plan1: "",
    plan2: "",
    plan3: "",
  });
  const [prices, setprices] = useState({
    plan1: "",
    plan2: "",
    plan3: "",
  });
  const [descriptions, setdescriptions] = useState({
    plan1: "",
    plan2: "",
    plan3: "",
  });

  const removeDuplicates = (data) => {
    let unique = [];
    data?.forEach((element) => {
      let isExist = unique.find((i) => i._id === element._id);

      if (!isExist) {
        unique.push(element);
      }
    });
    return unique;
  };

  useEffect(() => {
    axios.get("/paymentplan").then((res) => {
      console.log(res?.data);
      setplanData(res?.data);
      setplansData(res.data?.plans);
      let newServices = removeDuplicates(res.data?.services);
      setservices(newServices);
    });
  }, []);

  const handleAddPlans = () => {
    setloading(true);
    axios
      .post("/paymentplan/add/service", {
        name: title,
        ...descriptions,
      })
      .then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setloading(false);
        setopenAddService(false);
        setdescriptions({});
        settitle("");
        successAlert("Changes Saved");
        console.log(res.data.doc);
        setservices([{ name: title, ...descriptions }, ...services]);
      })
      .catch(() => {
        setloading(false);
        errorAlert("Changes failed to save");
      });
  };

  const handleClickOpen = () => {
    let plans = planData?.plans;
    if (plans) {
      setname({
        plan1: plans[0]?.name,
        plan2: plans[1]?.name,
        plan3: plans[2]?.name,
      });
      setdescriptions({
        plan1: plans[0]?.description,
        plan2: plans[1]?.description,
        plan3: plans[2]?.description,
      });
      setprices({
        plan1: plans[0]?.price,
        plan2: plans[1]?.price,
        plan3: plans[2]?.price,
      });
    }

    setOpen(true);
  };

  const handleClickEditOpen = (id) => {
    setopenEditService(true);
    let service = planData?.services.find((e) => e._id === id);
    setdescriptions(service);
    console.log(service);
    seteditID(id);
  };

  const handleEditService = () => {
    setloading(true);
    axios
      .put(`/paymentplan/update/services/${editID}`, descriptions)
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setopenEditService(false);
        setdescriptions({});
        successAlert("Changes Saved");
        //  setservices(res.data.doc.services);
        let newServices = removeDuplicates(res.data.doc?.services);
        setservices(newServices);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("Changes failed to save");
      });
  };

  const handleDeleteService = (id) => {
    axios
      .put(`/paymentplan/delete/services/${id}`)
      .then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        console.log(services.filter((i) => i._id !== id));
        setservices(services.filter((i) => i._id !== id));
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Delete failed");
      });
  };

  const handleEditPlans = () => {
    setloading(true);
    axios
      .put("/paymentplan/update/plans", [
        {
          name: name?.plan1,
          description: descriptions?.plan1,
          price: prices?.plan1,
          plan: "plan1",
        },
        {
          name: name?.plan2,
          description: descriptions?.plan2,
          price: prices?.plan2,
          plan: "plan2",
        },
        {
          name: name?.plan3,
          description: descriptions?.plan3,
          price: prices?.plan3,
          plan: "plan3",
        },
      ])
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setOpen(false);
        setprices({});
        setdescriptions({});
        setname({});
        successAlert("Changes Saved");
        console.log(res.data.doc);
        setplansData(res.data.doc?.plans);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("Changes failed to save");
      });
  };

  return (
    <div>
      {user?.role === "admin" && <CanteenNav />}
      <h3 className="my-5">Canteen Payment Plan</h3>
      <table className="table content__container">
        <thead>
          <tr>
            <th scope="col">
              <h4>Avaliable Payment Plan</h4>
              <p>
                {" "}
                <small> What kind of plan are you interested in </small>
              </p>
            </th>
            {plansData &&
              plansData?.map((plan) => (
                <th key={plan._id} scope="col">
                  <h5>
                    <strong>{plan?.name}</strong>
                  </h5>
                  <p>
                    <small>{plan?.description}</small>
                  </p>
                  <h1 className="d-flex align-items-end">
                    <strong>
                      {currentCurrency()}
                      {plan?.price}
                    </strong>{" "}
                    <small style={{ fontSize: "0.4em" }}>/month</small>{" "}
                  </h1>
                </th>
              ))}
            {user?.role === "admin" && (
              <th>
                <h5>Action</h5>
                <IconButton onClick={() => handleClickOpen()}>
                  <EditIcon />
                </IconButton>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {services &&
            services.map((service) => (
              <tr key={service._id}>
                <th scope="row">{service?.name}</th>
                <td>{service?.plan1}</td>
                <td>{service?.plan2}</td>
                <td>{service?.plan3}</td>
                {user?.role === "admin" && (
                  <td>
                    <div className="d-flex">
                      <IconButton
                        onClick={() => handleClickEditOpen(service?._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteService(service?._id)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          {user?.role === "admin" && (
            <tr>
              <th colSpan="4">Add Additional</th>
              <th>
                <IconButton onClick={() => setopenAddService(true)}>
                  <AddIcon />
                </IconButton>
              </th>
            </tr>
          )}
        </tbody>
      </table>

      <Edit
        open={open}
        name={name}
        loading={loading}
        setname={setname}
        descriptions={descriptions}
        setdescriptions={setdescriptions}
        prices={prices}
        isPlans={true}
        setprices={setprices}
        setOpen={setOpen}
        onSubmit={handleEditPlans}
      />
      <Edit
        open={openEditService}
        loading={loading}
        descriptions={descriptions}
        setdescriptions={setdescriptions}
        setOpen={setopenEditService}
        onSubmit={handleEditService}
      />
      <Edit
        title={title}
        loading={loading}
        settitle={settitle}
        open={openAddService}
        descriptions={descriptions}
        setdescriptions={setdescriptions}
        isAdd={true}
        setOpen={setopenAddService}
        onSubmit={handleAddPlans}
      />
    </div>
  );
}

export default PaymentPlan;
