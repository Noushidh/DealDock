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

  useEffect(()=>{
    if(success){
      dispatch(resetCheckout())
      dispatch(clearCart())
      navigate('/sell')
      notyf.success("Order placed successfully")
    }
  },[success,dispatch,navigate])

  if (loading) {
    return <p>Placing your order......</p>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />

                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-500">₹ {item.price}</p>
                </div>
              </div>

              <div className="text-lg font-bold">₹ {item.price}</div>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Total: ₹ {total}</h2>

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
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
