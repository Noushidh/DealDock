import { useState } from "react";
import { useDispatch,  } from "react-redux";
import { setSearch,setPrice } from "../../features/productSlice";

function FilterProducts() {
  const [price,setLocalPrice]=useState("")
  const [title,setLocalTitle]=useState("");
  const dispatch = useDispatch()
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Filter Products</h2>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 border rounded-md p-2"
          value={title}
          onChange={(e)=>setLocalTitle(e.target.value)}
        />

        <select className="w-full md:w-56 border rounded-md p-2" value={price} onChange={(e)=>setLocalPrice(e.target.value)}>
          <option value="">All Prices</option>
          <option value="0-1000">0-1000</option>
          <option value="1000-3000">1000-3000</option>
          <option value="3000-9000">3000-9000</option>
          <option value="9000+">9000+</option>
        </select>

        <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
        onClick={()=>{
          dispatch(setSearch(title));
          dispatch(setPrice(price));
        }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default FilterProducts;