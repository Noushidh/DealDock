import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Checkout } from "../features/checkoutThunk";
import { useEffect } from "react";
import notyf from "../utils/notyf";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cartSlice";
import { resetCheckout } from "../features/checkoutSlice";

function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((acc, curr) => acc + curr.price, 0);
  const productIds = cartItems.map((item) => item._id);

  const { loading, success, error } = useSelector(
    (state: RootState) => state.checkout,
  );

  const handleclick = () => {
    dispatch(Checkout(productIds));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetCheckout());
      dispatch(clearCart());
      navigate("/sell");
      notyf.success("Order placed successfully");
    }
  }, [success, dispatch, navigate]);

  if (loading) {
    return <p>Placing your order......</p>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-gray-600 hover:text-black transition"
        >
          ← Back to Cart
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border border-gray-200 rounded-lg p-3 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div>
                  <h2 className="font-semibold text-gray-900">{item.title}</h2>

                  <p className="text-sm text-gray-500 mt-1">₹ {item.price}</p>
                </div>
              </div>

              <p className="font-semibold text-gray-900">₹ {item.price}</p>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Total: ₹ {total}</h2>

          <button
            className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition disabled:opacity-50"
            onClick={handleclick}
            disabled={loading}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
export default CheckoutPage;
