type NavbarProps = {
  onSellClick: () => void;
};
function Navbar({ onSellClick }: NavbarProps) {
  return (
    <div className="bg-green-600 h-20 flex justify-end items-center gap-4 px-6 shadow-md">
      <button
        onClick={onSellClick}
        className="bg-white text-green-700 font-semibold px-5 py-2 rounded-lg shadow hover:bg-green-100 hover:scale-105 transition-all duration-200"
      >
        Sell Product
      </button>

      <button className="bg-red-500 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-red-600 hover:scale-105 transition-all duration-200">
        Logout
      </button>
    </div>
  );
}
export default Navbar;
