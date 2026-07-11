import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout";

type NavbarProps = {
  onSellClick: () => void;
};
function Navbar({ onSellClick }: NavbarProps) {
  const navigate = useNavigate();
  const cartLength = useSelector((state: RootState) => state.cart.items.length);
  return (
    <div className="bg-green-600 h-20 flex justify-end items-center gap-4 px-6 shadow-md">
      <button
        onClick={() => navigate("/cart")}
        className="relative flex items-center gap-2 bg-white text-green-700 font-semibold px-5 py-2 rounded-lg shadow hover:bg-green-100 hover:scale-105 transition-all duration-200"
      >
        <span className="text-xl">🛒</span>
        <span>Cart</span>

        <span className="bg-green-600 text-white text-xs font-bold rounded-full min-w-6 h-6 flex items-center justify-center px-2">
          {cartLength}
        </span>
      </button>
      <button
        onClick={onSellClick}
        className="bg-white text-green-700 font-semibold px-5 py-2 rounded-lg shadow hover:bg-green-100 hover:scale-105 transition-all duration-200"
      >
        Sell Product
      </button>

      <Logout/>
    </div>
  );
}
export default Navbar;
