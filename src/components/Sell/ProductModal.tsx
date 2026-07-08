import { useForm } from "react-hook-form";
import type { Product } from "../../types/product";
import axios from "axios";
import notyf from "../../utils/notyf";

function ProductModal({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();
  const productdata = async (data: Product) => {
    try {
      console.log(data)
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("image", data.image[0]);

      const response = await axios.post(
        "http://localhost:5000/api/addProduct",
        formData,
      );
      notyf.success(response.data.message);
    } catch (error: any) {
      notyf.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <form onSubmit={handleSubmit(productdata)}>
      <label>title</label>
      <input
        type="text"
        placeholder="title"
        {...register("title", {
          required: "title is required",
          minLength: {
            value: 10,
            message: "Description must be least 10 charecters",
          },
        })}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      <label>Description</label>
      <input type="text" placeholder="Description" {...register("description",{required:"Description is required"})}/>
      <label>Price</label>
      <input
        type="text"
        placeholder="price"
        {...register("price", {
          required: "price is required",
          min: { value: 1, message: "Price must be greate than 0" },
        })}
      />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      <label>Image URL</label>
      <input
        type="file"
        accept="image/*"
        placeholder="image"
        multiple
        {...register("image", { required: "Image URL is required" })}
      />
      {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      <button onClick={onClose}>cancel</button>
      <button>Add Product</button>
    </form>
  );
}

export default ProductModal;
