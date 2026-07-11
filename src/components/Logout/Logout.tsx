import axios from "axios";
import notyf from "../../utils/notyf";
import { getAuthHeader } from "../../utils/getAuthHeader";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { logout } from "../../features/authslice";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const handlelogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/logout",
        {},
        getAuthHeader(token),
      );
      notyf.success(response.data.message);
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/login");
    } catch (error: any) {
      notyf.error("Logout failed");
    }
  };
  return (
    <>
      <button
        className="bg-red-500 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-red-600 hover:scale-105 transition-all duration-200"
        onClick={handlelogout}
      >
        Logout
      </button>
    </>
  );
}

export default Logout;
