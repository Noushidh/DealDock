import axios from "axios";

export const searchProductsApi = async (
  title: string,
  price: string,
  page: number,
  limit: number
) => {
  const response = await axios.get(
    "http://localhost:5000/api/searchProducts",
    {
      params: {
        title,
        price,
        page,
        limit,
      },
    }
  );

  return response.data;
};