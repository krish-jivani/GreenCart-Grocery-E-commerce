import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../component/ProductCard";
import useTitle from "../hooks/useTitle";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();
  useTitle(
    category
      ? `${category.charAt(0).toUpperCase()}${category.slice(1)}`
      : "Category",
  );

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category,
  );

  const filteredProduct = products.filter(
    (product) => product.category.toLowerCase() === category,
  );

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium">
            {searchCategory.text.toUpperCase()}
          </p>
          <div className="w-16 h-0.5 bg-primary rounded-full "></div>
        </div>
      )}
      {filteredProduct.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-6 mt-6">
          {filteredProduct.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium text-primary">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
