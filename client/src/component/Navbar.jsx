import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const profileMenuRef = useRef(null);
  const {
    user,
    setUser,
    isSeller,
    setIsSeller,
    setShowUserLogin,
    getCartCount,
    navigate,
    searchQuery,
    setSearchQuery,
  } = useAppContext();

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-primary font-medium" : "text-gray-700";

  const logout = () => {
    setUser(null);
    setIsSeller(false);
    navigate("/");
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
      setOpen(false);
    }
  }, [searchQuery, navigate]);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput, setSearchQuery]);

  useEffect(() => {
    const closeMenuOnOutsideClick = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenuOnOutsideClick);
    return () =>
      document.removeEventListener("mousedown", closeMenuOnOutsideClick);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="GreenCart Logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={navLinkClass}>
          All Product
        </NavLink>
        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="" className="w-4 h-4" />
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img src={assets.cart_icon} alt="Cart" className="w-6 opacity-60" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center gap-4">
            {isSeller && (
              <button
                onClick={() => {
                  navigate("/seller/dashboard");
                }}
                className="px-4 py-2 rounded-full font-medium transition bg-primary/10 text-primary hover:bg-primary/20"
              >
                Dashboard
              </button>
            )}
            <div ref={profileMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={showProfileMenu}
              >
                <img src={assets.profile_icon} alt="User" className="w-10" />
              </button>
              <ul
                className={`${showProfileMenu ? "block" : "hidden"} p-2 absolute top-10 bg-white shadow border border-gray-200 py-2.5 right-0 w-40 z-40 text-sm`}
              >
                <li
                  onClick={() => {
                    navigate("/my-orders");
                    setShowProfileMenu(false);
                  }}
                  className="pl-3 hover:bg-primary/10 cursor-pointer py-2"
                >
                  My Orders
                </li>
                {isSeller && (
                  <li
                    onClick={() => {
                      navigate("/seller/dashboard");
                      setShowProfileMenu(false);
                    }}
                    className="pl-3 hover:bg-primary/10 cursor-pointer py-2"
                  >
                    Seller Dashboard
                  </li>
                )}
                <li
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  className="pl-3 hover:bg-primary/10 cursor-pointer py-2"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img src={assets.cart_icon} alt="Cart" className="w-6 opacity-60" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full">
            {getCartCount()}
          </button>
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu-icon" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${open ? "flex" : "hidden"} absolute top-15 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 z-50 text-sm md:hidden`}
      >
        <div className="w-full flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full mb-2">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="" className="w-4 h-4" />
        </div>

        <NavLink to="/" className={navLinkClass} onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={navLinkClass}
          onClick={() => setOpen(false)}
        >
          All Product
        </NavLink>
        <NavLink
          to="/contact"
          className={navLinkClass}
          onClick={() => setOpen(false)}
        >
          Contact
        </NavLink>
        {user && (
          <>
            <NavLink
              to="/my-orders"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              My Orders
            </NavLink>
            {isSeller && (
              <NavLink
                to="/seller/dashboard"
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                Seller Dashboard
              </NavLink>
            )}
          </>
        )}

        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
