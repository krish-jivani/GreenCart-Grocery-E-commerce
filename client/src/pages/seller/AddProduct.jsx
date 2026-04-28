import React, { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import useTitle from "../../hooks/useTitle";

const AddProduct = () => {
  const { addProductFromSeller } = useAppContext();
  useTitle("Seller Add Product");
  const [imagePreview, setImagePreview] = useState("");
  const previewUrlRef = useRef("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: categories[0]?.path || "Vegetables",
    price: "",
    offerPrice: "",
    inStock: true,
  });

  const categoryOptions = useMemo(
    () => categories.map((item) => item.path),
    [],
  );

  const onChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;
    setImagePreview(objectUrl);
  };

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Number(formData.offerPrice) > Number(formData.price)) {
      toast.error("Offer price should be less than or equal to price");
      return;
    }

    addProductFromSeller({
      ...formData,
      image: imagePreview,
    });

    toast.success("Product added successfully");
    setFormData({
      name: "",
      description: "",
      category: categories[0]?.path || "Vegetables",
      price: "",
      offerPrice: "",
      inStock: true,
    });

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }
    setImagePreview("");
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Add Product
      </h1>
      <p className="text-gray-500 mt-2">
        Create a new product for your catalog.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="md:col-span-2">
          <p className="text-sm text-gray-600 mb-2">Product Image</p>
          <label className="flex items-center gap-4 border border-dashed border-gray-300 rounded-xl p-4 cursor-pointer bg-gray-50">
            <img
              src={imagePreview || assets.upload_area}
              alt="Upload area"
              className="w-28 h-24 object-contain rounded"
            />
            <div className="flex items-center gap-2 text-primary font-medium">
              <img src={assets.add_icon} alt="add" className="w-5 h-5" />
              Upload Image
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-gray-600 md:col-span-2">
          Name
          <input
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            type="text"
            required
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-gray-600 md:col-span-2">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={onChangeHandler}
            rows={4}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary resize-none"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-gray-600">
          Category
          <select
            name="category"
            value={formData.category}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary bg-white"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-3 text-sm text-gray-700 mt-8 md:mt-0">
          <input
            name="inStock"
            checked={formData.inStock}
            onChange={onChangeHandler}
            type="checkbox"
            className="w-4 h-4 accent-primary"
          />
          In Stock
        </label>

        <label className="flex flex-col gap-2 text-sm text-gray-600">
          Price
          <input
            name="price"
            value={formData.price}
            onChange={onChangeHandler}
            type="number"
            min="0"
            required
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-gray-600">
          Offer Price
          <input
            name="offerPrice"
            value={formData.offerPrice}
            onChange={onChangeHandler}
            type="number"
            min="0"
            required
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-dull transition"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
