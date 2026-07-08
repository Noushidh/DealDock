import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import ProductModal from "../components/Sell/ProductModal";


function SellPage(){
    const [isOpen,setIsopen]=useState(false);

    return(
        <>
          <Navbar onSellClick={()=>setIsopen(true)}/>
            {isOpen && (
                <ProductModal onClose={()=>setIsopen(false)}/>
            )}
        </>
    )
}
export default SellPage