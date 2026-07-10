import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import type { Product } from "../../types/product";
import type { RootState } from "../../app/store";
import notyf from "../../utils/notyf";

type Props = {
  product: Product;
};

function AddToCartButton({ product }: Props) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleCart = () => {
    const existing = cartItems.find(
      item => item._id === product._id
    );

    if (existing) {
      notyf.error("Product already added to cart");
    } else {
      dispatch(addToCart(product));
      notyf.success("Item added to cart");
    }
  };

  return (
    <button
      onClick={handleCart}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;