import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../../app/store";
import type { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../../components/cart/addTocart";
import { fetchProducts } from "../../features/productThunk";
import type { AppDispatch } from "../../app/store";

type Props = {
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

function ProductListing({ onEdit, onDelete }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.product,
  );
  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
  if (loading) {
    return <h2>Loading ....</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

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

          <button onClick={() => navigate(`/product/${product._id}`)}>
            view
          </button>

          <AddToCartButton product={product} />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => onEdit(product)}
              className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(product._id)}
              className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
            >
              Delete{" "}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductListing;
