import { useForm } from "react-hook-form";
import type { Product } from "../../types/product";
import axios from "axios";
import notyf from "../../utils/notyf";
import { useDispatch } from "react-redux";
import { addProduct,updateProduct } from "../../features/productSlice";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ProductModal({
  onClose,
  isEdit,
}: {
  onClose: () => void;
  isEdit: boolean;
}) {
  const dispatch = useDispatch();

  const selectedProduct = useSelector(
    (state: RootState) => state.product.selectedProduct,
  );

  console.log(selectedProduct);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    if (isEdit && selectedProduct) {
      reset({
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
        images: selectedProduct.images,
      });
    }
  }, [isEdit, selectedProduct, reset]);

  const onSubmit = async (data: Product) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }

      let response;

      if (isEdit && selectedProduct) {
        response = await axios.patch(
          `http://localhost:5000/api/editProduct/${selectedProduct._id}`,
          formData,
        );
        dispatch(updateProduct(response.data.product))
      } else {
        response = await axios.post(
          "http://localhost:5000/api/addProduct",
          formData,
        );
        dispatch(addProduct(response.data.product));
      }

      notyf.success(response.data.message);
      onClose();
    } catch (error: any) {
      notyf.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Title
            </label>
            <input
              type="text"
              placeholder="Enter product title"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 1,
                  message: "Price must be greater than 0",
                },
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full border border-gray-300 rounded-lg px-3 py-2 file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md file:cursor-pointer cursor-pointer"
              {...register("images", {
                required: "Image is required",
              })}
            />
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {errors.images.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
