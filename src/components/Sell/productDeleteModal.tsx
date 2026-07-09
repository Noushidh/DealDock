import axios from "axios";
import notyf from "../../utils/notyf";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../features/productSlice";

type Props = {
  productId: string | null;
  onClose: () => void;
};
function ProductDeleteModal({ productId, onClose }: Props) {
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/deleteProduct/${productId}`,
      );
      dispatch(deleteProduct(response.data.id));
      notyf.success(response.data.message);
    } catch (error: any) {
      notyf.error(error.response?.data?.message);
    }
  };
return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
      <h2 className="text-xl font-semibold text-gray-800">
        Delete Product
      </h2>

      <p className="mt-3 text-gray-600">
        Are you sure you want to delete this product?
        <br />
        This action cannot be undone.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleClick}
          className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);
}

export default ProductDeleteModal;
