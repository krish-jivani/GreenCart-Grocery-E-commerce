import React from "react";
import { useAppContext } from "../context/AppContext";
import useTitle from "../hooks/useTitle";

const statusClassMap = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-amber-100 text-amber-700",
  Processing: "bg-gray-100 text-gray-700",
};

const MyOrders = () => {
  const { orders, navigate } = useAppContext();
  useTitle("My Orders");

  const hasOrders = orders.length > 0;

  return (
    <div className="mt-16 pb-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-3xl font-medium">My Orders</h1>
      <p className="mt-2 text-gray-600">
        Track your latest purchases and delivery status.
      </p>

      {!hasOrders ? (
        <div className="mt-8 border border-dashed border-gray-300 rounded-2xl py-14 px-6 text-center bg-gray-50/60">
          <h2 className="text-2xl font-medium text-gray-800">No orders yet</h2>
          <p className="text-gray-500 mt-2">
            Once you place an order, it will appear here.
          </p>
          <button
            onClick={() => {
              navigate("/products");
            }}
            className="mt-6 inline-flex px-5 py-3 rounded-full bg-primary text-white hover:bg-primary-dull transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-2xl p-4 md:p-5 bg-white"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-gray-100">
                <p className="text-sm text-gray-500">
                  Date Placed:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold w-max ${statusClassMap[order.status] || statusClassMap.Processing}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.product.image[0]}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg border border-gray-200 object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="font-medium text-gray-700">
                      ₹{item.product.offerPrice * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm md:text-base">
                <p className="text-gray-500">Payment: {order.paymentType}</p>
                <p className="font-semibold text-gray-800">
                  Total: ₹{order.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
