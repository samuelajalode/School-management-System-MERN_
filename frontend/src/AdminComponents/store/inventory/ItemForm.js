import React from "react";
import { useForm } from "react-hook-form";

function ItemForm({
  name,
  setname,
  description,
  setdescription,
  price,
  quantity,
  unit,
  setunit,
  setquantity,
  setprice,
  loading,
  isEdit,
  onSubmit,
}) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form action="">
      <div className="mb-3">
        <label className="form-label"> Name</label>
        <input
          name="name"
          type="text"
          value={name}
          ref={register({ required: true })}
          onChange={(e) => setname(e.target.value)}
          className="form-control"
          placeholder=""
        />
        {errors.name && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label"> Units</label>
        <input
          name="unit"
          type="text"
          value={unit}
          ref={register({ required: true })}
          onChange={(e) => setunit(e.target.value)}
          className="form-control"
          placeholder="eg kg "
        />
        {errors.unit && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label"> Quantity</label>
        <input
          name="quantity"
          type="number"
          value={quantity}
          ref={register({ required: true })}
          onChange={(e) => setquantity(e.target.value)}
          className="form-control"
          placeholder="Quantity in stock"
        />
        {errors.quantity && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label"> Price</label>
        <input
          name="price"
          type="number"
          value={price}
          ref={register({ required: true })}
          onChange={(e) => setprice(e.target.value)}
          className="form-control"
          placeholder=""
        />
        {errors.price && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label"> Description</label>
        <input
          name="description"
          type="text"
          value={description}
          ref={register({ required: true })}
          onChange={(e) => setdescription(e.target.value)}
          className="form-control"
          placeholder=""
        />
        {errors.description && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-3">
        <button
          disabled={loading}
          className="btn blue__btn"
          onClick={handleSubmit(onSubmit)}
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {isEdit ? "Edit" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
