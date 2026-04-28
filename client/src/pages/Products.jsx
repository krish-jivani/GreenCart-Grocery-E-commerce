import React from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../component/ProductCard";
import { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";

const Products = () => {
  const { products, searchQuery, setSearchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  useTitle("Products");

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  const visibleProducts = filteredProducts.filter((product) => product.inStock);

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col">
      <div className="flex flex-col items-end w-max ">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
        {searchQuery.length > 0 && visibleProducts.length === 0 ? (
          <p>No products found for "{searchQuery}"</p>
        ) : (
          <p>Showing {visibleProducts.length} products</p>
        )}
        {searchQuery.length > 0 && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-primary hover:underline cursor-pointer"
          >
            Clear search
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {products.length === 0
          ? Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md px-3 md:px-4 py-2 bg-white"
              >
                <div className="h-30 rounded-md bg-gray-200 animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded mt-4"></div>
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mt-2"></div>
                <div className="h-8 w-full bg-gray-200 animate-pulse rounded mt-4"></div>
              </div>
            ))
          : visibleProducts.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
      </div>
    </div>
  );
};

export default Products;
