import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyAddress, dummyOrders, dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [addresses, setAddresses] = useState(dummyAddress);
  const [orders, setOrders] = useState(dummyOrders);

  //

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  //

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Product added to cart");
  };

  const updateCartItem = (itemId, qty) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = qty;
    setCartItems(cartData);
  };

  const removeCartItem = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Product removed from cart");
  };

  const addAddress = (addressData) => {
    const [firstName = "", ...lastNameParts] = addressData.fullName
      .trim()
      .split(" ");
    const newAddress = {
      _id: `addr_${Date.now()}`,
      userId: user?._id || "guest-user",
      firstName,
      lastName: lastNameParts.join(" "),
      email: user?.email || "guest@example.com",
      street: addressData.street,
      city: addressData.city,
      state: addressData.state,
      zipcode: Number(addressData.zipcode),
      country: "IN",
      phone: addressData.phone,
    };

    setAddresses((prevAddresses) => [newAddress, ...prevAddresses]);
    return newAddress;
  };

  const addProductFromSeller = (productData) => {
    const newProduct = {
      _id: `seller_${Date.now()}`,
      name: productData.name,
      category: productData.category,
      price: Number(productData.price),
      offerPrice: Number(productData.offerPrice),
      image: [productData.image || dummyProducts[0].image[0]],
      description: productData.description
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      inStock: productData.inStock,
    };

    setProducts((prevProducts) => [newProduct, ...prevProducts]);
    return newProduct;
  };

  const deleteProductFromSeller = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId),
    );

    setCartItems((prevCartItems) => {
      const cartData = structuredClone(prevCartItems);
      delete cartData[productId];
      return cartData;
    });
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) {
        continue;
      }
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.round(totalAmount * 100) / 100;
  };

  const clearCart = () => {
    setCartItems({});
  };

  const placeOrderFromCart = ({ items, amount, address, paymentType }) => {
    const order = {
      _id: `order_${Date.now()}`,
      userId: user?._id || "guest-user",
      items,
      amount,
      address,
      status: "Processing",
      paymentType,
      isPaid: paymentType === "Online",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders((prevOrders) => [order, ...prevOrders]);
    clearCart();
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order,
      ),
    );
  };

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    addresses,
    orders,
    addToCart,
    updateCartItem,
    removeCartItem,
    addAddress,
    addProductFromSeller,
    deleteProductFromSeller,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    clearCart,
    placeOrderFromCart,
    updateOrderStatus,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
