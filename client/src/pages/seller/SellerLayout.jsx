import React from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const SellerLayout = () => {
  const { isSeller, navigate } = useAppContext();

  if (!isSeller) {
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    {
      label: "Dashboard",
      path: "/seller/dashboard",
      icon: assets.box_icon,
    },
    {
      label: "Add Product",
      path: "/seller/add-product",
      icon: assets.add_icon,
    },
    {
      label: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    {
      label: "Orders",
      path: "/seller/orders",
      icon: assets.order_icon,
    },
  ];

  const linkClass = ({ isActive }) =>
    isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-primary/10";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-4 md:hidden">
        <div className="flex items-center justify-between py-4">
          <img src={assets.logo} alt="GreenCart" className="h-8" />
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dull transition"
          >
            ← Website
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 pb-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-700"} rounded-lg py-2 text-center text-xs font-medium`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-350 md:flex">
        <aside className="hidden md:block w-72 bg-white border-r border-gray-200 min-h-screen px-5 py-6 flex flex-col">
          <div>
            <img src={assets.logo} alt="GreenCart" className="h-9" />
            <p className="text-sm text-gray-500 mt-2">
              Manage products and orders from here.
            </p>

            <nav className="mt-8 space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `${linkClass({ isActive })} flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition`
                  }
                >
                  <img src={item.icon} alt="" className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 mt-auto mb-2 w-full px-3 py-2.5 text-gray-700 hover:bg-primary/10 rounded-lg font-medium transition border border-gray-300"
          >
            ← Go to Website
          </button>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
