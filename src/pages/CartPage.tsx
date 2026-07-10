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
    <div className="p-6">
      <button onClick={() => navigate(-1)}>back</button>
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>
      {cartItems.length === 0 ? (
        <p>your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 mb-4 flex justify-between items-center shadow-md bg-white"
          >
            <div className="flex gap-4">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-32 h-32 object-cover rounded"
              />

              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p>{item.description}</p>
                <p className="font-bold text-green-600">₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>

            <button
              onClick={() => handleRemove(item._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Remove Item
            </button>
          </div>
        ))
      )}
    </div>
  );
}
export default CartPage;
