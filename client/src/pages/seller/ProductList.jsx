import React from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import useTitle from "../../hooks/useTitle";

const ProductList = () => {
  const { products, deleteProductFromSeller } = useAppContext();
  useTitle("Seller Product List");

  const onDeleteHandler = (productId) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }
    deleteProductFromSeller(productId);
    toast.success("Product deleted");
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Product List
      </h1>
      <p className="text-gray-500 mt-2">Manage all products in your store.</p>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <div className="hidden md:grid grid-cols-[90px_2fr_1fr_1fr_1fr_1fr] gap-3 px-4 py-3 bg-gray-50 text-sm font-medium text-gray-600 border-b border-gray-200">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Offer</p>
          <p>Stock</p>
        </div>

        <div className="divide-y divide-gray-100">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-4 md:grid md:grid-cols-[90px_2fr_1fr_1fr_1fr_1fr] md:gap-3 md:items-center"
            >
              <div className="flex items-center gap-3 md:block">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-16 h-16 md:w-14 md:h-14 rounded-lg border border-gray-200 object-cover"
                />
                <div className="md:hidden">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {product.category}
                  </p>
                </div>
              </div>

              <p className="hidden md:block font-medium text-gray-800">
                {product.name}
              </p>
              <p className="hidden md:block text-gray-600">
                {product.category}
              </p>
              <p className="hidden md:block text-gray-700">₹{product.price}</p>
              <p className="hidden md:block text-gray-700">
                ₹{product.offerPrice}
              </p>

              <div className="mt-3 md:mt-0 flex items-center justify-between md:block">
                <span
                  className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${product.inStock ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"}`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
                <button
                  onClick={() => onDeleteHandler(product._id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
