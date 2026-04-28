import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-20 mb-28">
      <p className="text-2xl md:text-3xl font-medium mb-8">Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-5">
        {categories.map((categories, index) => (
          <div
            key={index}
            className="group cursor-pointer px-3 py-5 gap-2 flex flex-col rounded-lg justify-center items-center"
            style={{ backgroundColor: categories.bgColor }}
            onClick={() => {
              navigate(`/products/${categories.path.toLowerCase()}`);
            }}
          >
            <img
              src={categories.image}
              alt={categories.text}
              className="group-hover:scale-108 transition max-w-28"
            />
            <p className="text-sm font-medium ">{categories.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
