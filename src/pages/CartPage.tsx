import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../features/cartSlice";
import notyf from "../utils/notyf";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const handleRemove = (id: string) => {
    dispatch(removeCart(id));
    notyf.success("item removed from cart");
  };
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-gray-600 hover:text-black font-medium transition"
        >
          <span className="text-xl">←</span>
          Back
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              My Cart
            </h1>
            <p className="text-gray-500 mt-1">
              Review your items before checkout
            </p>
          </div>

          {cartItems.length !== 0 && (
            <span className="hidden sm:block bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
              {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
            </span>
          )}
        </div>
      </div>

      {/* Cart */}
      <div className="max-w-6xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-3xl">🛒</span>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>

            <p className="text-gray-500">
              Looks like you haven't added anything to your cart yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  {/* Product Image */}
                  <div className="shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-xl bg-gray-100"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {item.title}
                        </h2>

                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Price */}
                      <p className="text-xl font-bold text-gray-900 whitespace-nowrap">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Bottom Details */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Quantity</span>

                        <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="w-full sm:w-auto border border-red-200 text-red-500 px-5 py-2.5 rounded-xl font-medium hover:bg-red-50 hover:border-red-300 transition duration-200"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Checkout Section */}
            <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <p className="text-sm text-gray-500">
                  Ready to complete your order?
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-1">
                  Proceed to checkout
                </h3>
              </div>

              <button
                className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition duration-200 shadow-sm"
                onClick={() => navigate("/checkout")}
              >
                Checkout →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default CartPage;
