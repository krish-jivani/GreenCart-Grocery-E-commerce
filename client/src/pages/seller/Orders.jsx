import React from "react";
import { useAppContext } from "../../context/AppContext";
import useTitle from "../../hooks/useTitle";

const Orders = () => {
  const { orders, updateOrderStatus } = useAppContext();
  useTitle("Seller Orders");

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Orders
      </h1>
      <p className="text-gray-500 mt-2">Track and update customer orders.</p>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <div className="hidden lg:grid grid-cols-[1.5fr_1fr_2fr_1fr_1fr_1fr] gap-3 px-4 py-3 bg-gray-50 text-sm font-medium text-gray-600 border-b border-gray-200">
          <p>Order ID</p>
          <p>Customer</p>
          <p>Items</p>
          <p>Total</p>
          <p>Date</p>
          <p>Status</p>
        </div>

        <div className="divide-y divide-gray-100">
          {orders.map((order) => {
            const customerName = `${order.address?.firstName || "Guest"} ${order.address?.lastName || "Customer"}`;
            const itemSummary = order.items
              .map((item) => `${item.product.name} x${item.quantity}`)
              .join(", ");

            return (
              <div
                key={order._id}
                className="p-4 lg:grid lg:grid-cols-[1.5fr_1fr_2fr_1fr_1fr_1fr] lg:gap-3 lg:items-center text-sm"
              >
                <p className="font-medium text-gray-800 truncate">
                  #{order._id.slice(-6).toUpperCase()}
                </p>
                <p className="text-gray-700 mt-2 lg:mt-0">{customerName}</p>
                <p className="text-gray-600 mt-2 lg:mt-0">{itemSummary}</p>
                <p className="text-gray-700 mt-2 lg:mt-0">₹{order.amount}</p>
                <p className="text-gray-600 mt-2 lg:mt-0">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <select
                  value={order.status}
                  onChange={(event) =>
                    updateOrderStatus(order._id, event.target.value)
                  }
                  className="mt-3 lg:mt-0 border border-gray-300 bg-white rounded-lg px-2 py-1.5 outline-none"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
