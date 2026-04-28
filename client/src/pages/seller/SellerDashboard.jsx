import React from "react";
import { useAppContext } from "../../context/AppContext";
import useTitle from "../../hooks/useTitle";

const SellerDashboard = () => {
  const { products, orders } = useAppContext();
  useTitle("Seller Dashboard");

  const inStockCount = products.filter((product) => product.inStock).length;
  const outOfStockCount = products.length - inStockCount;
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Dashboard
      </h1>
      <p className="text-gray-500 mt-2">
        Quick overview of your store performance.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">
            {products.length}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">In Stock</p>
          <p className="text-2xl font-semibold text-emerald-600 mt-1">
            {inStockCount}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Out Of Stock</p>
          <p className="text-2xl font-semibold text-amber-600 mt-1">
            {outOfStockCount}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">
            {orders.length}
          </p>
          <p className="text-xs text-gray-500 mt-2">Revenue: ₹{totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
