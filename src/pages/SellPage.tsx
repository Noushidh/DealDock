import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import ProductModal from "../components/Sell/ProductModal";
import ProductListing from "../components/Sell/productList";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../features/productSlice";
import type { Product } from "../types/product";
import ProductDeleteModal from "../components/Sell/productDeleteModal";
import FilterProducts from "../components/Sell/FilterProducts";


function SellPage() {
  const dispatch = useDispatch();

  const [isOpen, setIsopen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isdelete,setIsdelete]=useState(false);
  const [selectedProductId,setSelectedProductId]=useState<null|string>(null)

  const handleEdit = (product: Product) => {
    dispatch(setSelectedProduct(product));
    setIsopen(true);
    setIsEdit(true)
  };

  const handleDelete = (id:string)=>{
    setSelectedProductId(id)
    setIsdelete(true);
  }
  return (
    <>
      <Navbar onSellClick={() => {
      setIsEdit(false)
      setIsopen(true)
    }}
      />
      <FilterProducts/>
      {isOpen && <ProductModal isEdit={isEdit} onClose={() => setIsopen(false)} />}
      <ProductListing onEdit={handleEdit} onDelete={handleDelete}/>
      {isdelete && <ProductDeleteModal productId={selectedProductId} onClose={()=>setIsdelete(false)}/>}
    </>
  );
}
export default SellPage;
