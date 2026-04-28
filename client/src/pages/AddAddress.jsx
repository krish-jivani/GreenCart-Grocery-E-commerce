import React, { useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import useTitle from "../hooks/useTitle";

const AddAddress = () => {
  const { navigate, addAddress } = useAppContext();
  useTitle("Add Address");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    zipcode: "",
    street: "",
    city: "",
    state: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addAddress(formData);
    toast.success("Address added successfully");
    navigate("/cart");
  };

  return (
    <div className="mt-16 pb-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-3xl font-medium">Add New Address</h1>
      <p className="text-gray-500 mt-2">
        Fill in the delivery details to use this address at checkout.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
        <div className="hidden md:flex items-center justify-center rounded-2xl bg-emerald-50 p-6">
          <img
            src={assets.add_address_iamge}
            alt="Add address"
            className="w-full max-w-52 object-contain"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            ["fullName", "Full Name"],
            ["phone", "Phone"],
            ["zipcode", "Pincode"],
            ["street", "Street / Area"],
            ["city", "City"],
            ["state", "State"],
          ].map(([name, label]) => (
            <label
              key={name}
              className={`flex flex-col gap-2 text-sm text-gray-600 ${name === "street" ? "md:col-span-2" : ""}`}
            >
              {label}
              <input
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
                type={name === "phone" ? "tel" : "text"}
                pattern={
                  name === "phone"
                    ? "[0-9]{10}"
                    : name === "zipcode"
                      ? "[0-9]{6}"
                      : undefined
                }
                required
              />
            </label>
          ))}

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="px-5 py-3 rounded-full border border-gray-300 text-gray-700"
            >
              Back to Cart
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-dull transition"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
