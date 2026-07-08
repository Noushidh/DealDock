type NavbarProps = {
  onSellClick: () => void;
};
function Navbar({ onSellClick }: NavbarProps) {
  return (
    <div className="bg-green-500 h-20">
      <button onClick={onSellClick}>Sell Product</button>
      <button>Logout</button>
    </div>
  );
}
export default Navbar;
