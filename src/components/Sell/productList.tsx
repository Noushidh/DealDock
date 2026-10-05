import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../../app/store";
import type { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../../components/cart/addTocart";
import { fetchProducts } from "../../features/productThunk";
import type { AppDispatch } from "../../app/store";
import { searchProductsApi } from "../../api/productApi";
import { setFilteredProducts } from "../../features/productSlice";

type Props = {
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

function ProductListing({ onEdit, onDelete }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((items: RootState) => items.auth.user);
  console.log('user is',user);

  const { products, loading, error, currentPage, totalPages, search, price } =
    useSelector((state: RootState) => state.product);

  const changePage = async (page: number) => {
    const data = await searchProductsApi(search, price, page, 5);

    dispatch(setFilteredProducts(data));
  };

  products.forEach((product) => {
  console.log("User ID:", user?.id);
  console.log("Owner:", product.owner);
  console.log("Equal?", user?.id === product.owner);
  console.log(typeof user?.id);
console.log(typeof product.owner);
});

  const handleNext = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No products found
          </h2>
          <p className="text-gray-500 mt-2">
            Try changing the search or price filter.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {product.title}
                  </h2>

                  <p className="text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-2xl font-bold text-green-600 mt-4">
                    ₹{product.price}
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2"
                    >
                      View
                    </button>
                  </div>

                  {user && (
                    <>
                      {user.id === product.owner ? (
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => onEdit(product)}
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg py-2"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => onDelete(product._id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2"
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <AddToCartButton product={product} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="bg-white shadow rounded-lg px-6 py-2">
              <span className="font-semibold">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductListing;
