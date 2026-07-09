import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import ProductModal from "../components/Sell/ProductModal";
import ProductListing from "../components/Sell/productList";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../features/productSlice";
import type { Product } from "../types/product";

function SellPage() {
  const dispatch = useDispatch();
  const [isOpen, setIsopen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = (product: Product) => {
    dispatch(setSelectedProduct(product));
    setIsopen(true);
    setIsEdit(true)
  };
  return (
    <>
      <Navbar onSellClick={() => {
      setIsEdit(false)
      setIsopen(true)
    }}
      />
      {isOpen && <ProductModal isEdit={isEdit} onClose={() => setIsopen(false)} />}
      <ProductListing onEdit={handleEdit} />
    </>
  );
}
export default SellPage;
