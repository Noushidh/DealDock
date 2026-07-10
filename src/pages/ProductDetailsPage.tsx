import type { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddToCartButton from "../components/cart/addTocart";

function ProductDetailsPage() {
  const navigte = useNavigate()
  const { id } = useParams();
  const products = useSelector((state: RootState) => state.product.products);
  const product = products.find((item) => item._id === id);
  if (!product) {
    return <p>Product not found.</p>;
  }
  return (
    <div className="max-w-4xl mx-auto bg-gray-100 rounded-2xl shadow-lg p-6">
        <button className="mb-5 border bg-black rounded text-white" onClick={()=>navigte(-1)}>go back</button>
      <div className="flex gap-4 flex-wrap mb-6">
        {product?.images.map((image, index) => (
          <div
            key={index}
            className="w-44 h-44 bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center p-2 hover:shadow-xl transition"
          >
            <img
              src={image}
              alt={`${product?.title}-${index}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-3">{product.title}</h2>

        <p className="text-gray-600 mb-6">{product.description}</p>

        <p className="text-3xl font-bold text-green-600 mb-6">
          ₹{product.price}
        </p>

        <div className="flex justify-end">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
export default ProductDetailsPage;
