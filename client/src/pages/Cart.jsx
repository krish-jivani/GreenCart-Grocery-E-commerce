import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import useTitle from "../hooks/useTitle";

const Cart = () => {
  const {
    cartItems,
    getCartCount,
    navigate,
    getCartAmount,
    updateCartItem,
    removeCartItem,
    products,
    addresses,
    placeOrderFromCart,
  } = useAppContext();

  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0] || null);
  const [paymentOption, setPaymentOption] = useState("COD");
  useTitle("Cart");

  const cartArray = useMemo(() => {
    return Object.entries(cartItems)
      .map(([itemId, quantity]) => {
        const product = products.find((itemInfo) => itemInfo._id === itemId);
        if (!product) {
          return null;
        }

        return {
          ...product,
          quantity,
        };
      })
      .filter(Boolean);
  }, [cartItems, products]);

  const subTotal = getCartAmount();
  const taxAmount = Math.round(subTotal * 0.02 * 100) / 100;
  const totalAmount = Math.round((subTotal + taxAmount) * 100) / 100;

  const placeOrder = () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (cartArray.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderItems = cartArray.map((product) => ({
      _id: `item_${product._id}_${Date.now()}`,
      product,
      quantity: product.quantity,
    }));

    placeOrderFromCart({
      items: orderItems,
      amount: totalAmount,
      address: selectedAddress,
      paymentType: paymentOption,
    });

    toast.success("Order placed successfully!");
    navigate("/my-orders");
  };

  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      setSelectedAddress(addresses[0]);
      return;
    }

    if (
      selectedAddress &&
      !addresses.find((address) => address._id === selectedAddress._id)
    ) {
      setSelectedAddress(addresses[0] || null);
    }
  }, [addresses, selectedAddress]);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 pb-16">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-medium mb-6">
            Shopping Cart{" "}
            {getCartCount() > 0 && (
              <span className="text-sm text-primary">{getCartCount()}</span>
            )}
          </h1>

          {cartArray.length === 0 ? (
            <div className="border border-dashed border-gray-300 rounded-2xl py-16 px-6 text-center bg-gray-50/60">
              <img
                src={assets.cart_icon}
                alt="Cart"
                className="w-14 mx-auto mb-4 opacity-60"
              />
              <h2 className="text-2xl font-medium text-gray-800">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mt-2">
                Add a few items to start building your order.
              </p>
              <button
                onClick={() => {
                  navigate("/products");
                }}
                className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-full bg-primary text-white hover:bg-primary-dull transition"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                <p className="text-left">Product Details</p>
                <p className="text-center">Subtotal</p>
                <p className="text-center">Action</p>
              </div>

              {cartArray.map((product) => (
                <div
                  key={product._id}
                  className="border-t border-gray-200 pt-4 pb-3 text-gray-500 text-sm md:text-base font-medium"
                >
                  <div className="flex items-start justify-between gap-4 md:grid md:grid-cols-[2fr_1fr_1fr] md:items-center">
                    <div className="flex items-center md:gap-6 gap-3 min-w-0">
                      <div
                        onClick={() => {
                          navigate(
                            `/products/${product.category.toLowerCase()}/${product._id}`,
                          );
                        }}
                        className="cursor-pointer w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden shrink-0"
                      >
                        <img
                          className="max-w-full h-full object-cover"
                          src={product.image[0]}
                          alt={product.name}
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-gray-700 truncate">
                          {product.name}
                        </p>
                        <div className="font-normal text-gray-500/80 text-sm mt-1">
                          <p>
                            Weight: <span>{product.weight || "N/A"}</span>
                          </p>
                          <div className="flex items-center gap-1">
                            <p>Qty:</p>
                            <select
                              onChange={(e) =>
                                updateCartItem(
                                  product._id,
                                  Number(e.target.value),
                                )
                              }
                              value={cartItems[product._id]}
                              className="outline-none bg-transparent"
                            >
                              {Array(
                                cartItems[product._id] > 9
                                  ? cartItems[product._id]
                                  : 9,
                              )
                                .fill("")
                                .map((_, index) => (
                                  <option key={index} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="hidden md:block text-center">
                      ₹{product.offerPrice * product.quantity}
                    </p>
                    <button
                      onClick={() => removeCartItem(product._id)}
                      className="hidden md:block cursor-pointer mx-auto"
                    >
                      <img
                        src={assets.remove_icon}
                        alt="remove"
                        className="inline-block w-6 h-6"
                      />
                    </button>
                  </div>

                  <div className="md:hidden mt-3 flex items-center justify-between">
                    <p className="font-medium text-gray-700">
                      ₹{product.offerPrice * product.quantity}
                    </p>
                    <button
                      onClick={() => removeCartItem(product._id)}
                      className="cursor-pointer"
                    >
                      <img
                        src={assets.remove_icon}
                        alt="remove"
                        className="inline-block w-6 h-6"
                      />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  navigate("/products");
                }}
                className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
              >
                <img
                  className="group-hover:-translate-x-1"
                  src={assets.arrow_right_icon_colored}
                  alt=""
                />
                Continue Shopping
              </button>
            </>
          )}
        </div>

        <div className="max-w-90 w-full bg-gray-100/40 p-5 h-max border border-gray-300/70 md:sticky md:top-4 self-start max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
          <hr className="border-gray-300 my-5" />

          <div className="mb-6">
            <p className="text-sm font-medium uppercase">Delivery Address</p>
            <div className="relative flex justify-between items-start gap-4 mt-2">
              <p className="text-gray-500 leading-6">
                {selectedAddress
                  ? `${selectedAddress.firstName} ${selectedAddress.lastName}, ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "No address found"}
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-primary hover:underline cursor-pointer shrink-0"
              >
                Change
              </button>
              {showAddress && (
                <div className="absolute top-12 right-0 left-0 z-10 py-1 bg-white border border-gray-300 text-sm w-full shadow-lg">
                  {addresses.map((address) => (
                    <p
                      key={address._id}
                      onClick={() => {
                        setSelectedAddress(address);
                        setShowAddress(false);
                      }}
                      className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {address.street}, {address.city}, {address.state}
                    </p>
                  ))}
                  <p
                    onClick={() => {
                      setShowAddress(false);
                      navigate("/add-address");
                    }}
                    className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                  >
                    Add address
                  </p>
                </div>
              )}
            </div>

            <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

            <select
              onChange={(e) => setPaymentOption(e.target.value)}
              className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            >
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <hr className="border-gray-300" />

          <div className="text-gray-500 mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Price</span>
              <span>₹{subTotal}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-green-600">Free</span>
            </p>
            <p className="flex justify-between">
              <span>Tax (2%)</span>
              <span>₹{taxAmount}</span>
            </p>
            <p className="flex justify-between text-lg font-medium mt-3">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </p>
          </div>

          <button
            onClick={placeOrder}
            className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
          >
            {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
          </button>
          {paymentOption === "Online" && (
            <p className="text-xs text-gray-500 mt-2">
              You will be redirected to payment gateway.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
