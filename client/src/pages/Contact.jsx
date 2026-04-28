import React, { useState } from "react";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { assets } from "../assets/assets";

const Contact = () => {
  useTitle("Contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General",
    message: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    toast.success("Message sent successfully. We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "General",
      message: "",
    });
  };

  return (
    <div className="mt-16 pb-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-3xl font-medium">Contact Us</h1>
      <p className="mt-2 text-gray-600">
        Need help with an order or want to share feedback? We are here.
      </p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-medium text-gray-800">Reach Us</h2>

          <div className="mt-5 space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                <img
                  src={assets.delivery_truck_icon}
                  alt="Address"
                  className="w-4 h-4"
                />
              </span>
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-gray-500">
                  123 Fresh Market Road, Main City, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm">
                📞
              </span>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-gray-500">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm">
                ✉
              </span>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-500">support@greencart.com</p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4"
        >
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
              type="text"
              required
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              type="email"
              required
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={onChangeHandler}
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary bg-white"
            >
              <option value="General">General</option>
              <option value="Order Issue">Order Issue</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={onChangeHandler}
              required
              rows={5}
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-dull transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
