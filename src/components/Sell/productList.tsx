import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../features/productSlice";
import axios from "axios";
import { useEffect } from "react";
import type { RootState } from "../../app/store";
import type { Product } from "../../types/product";

type Props = {
  onEdit: (product: Product) => void;
};

function ProductListing({onEdit}:Props) {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  console.log(products)

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:5000/api/products");

    dispatch(setProducts(response.data.products));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="border">
      {products.map((product) => (
        <div key={product._id} className="border p-4 mb-4">
          <div className="flex gap-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title}-${index}`}
                className="w-40 h-40 object-cover"
              />
            ))}
          </div>
          <h2>{product.title}</h2>

          <p>{product.description}</p>

          <p>₹{product.price}</p>

          <button onClick={()=>onEdit(product)}>edit</button>
          <button>delete</button>
        </div>
      ))}
    </div>
  );
}

export default ProductListing;
