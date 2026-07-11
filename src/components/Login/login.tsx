import { useForm } from "react-hook-form";
import axios from "axios";
import notyf from "../../utils/notyf";
import type { LoginResponse, AuthForm } from "../../types/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/authslice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>();

  const onsubmit = async (data: AuthForm) => {
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:5000/api/login",
        data,
      );
      dispatch(
        loginSuccess({ user: response.data.user, token: response.data.token }),
      );
      localStorage.setItem("token",response.data.token)
      notyf.success(response.data.message);
      navigate("/sell");
    } catch (error: any) {
      notyf.error(error.response?.data?.message);
    }
  };


return (
  <div className="flex justify-center mt-20">
    <div className="w-80">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Welcome Back!
      </h1>

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <div>
          <input
            className="w-full border rounded p-2"
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            className="w-full border rounded p-2"
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white rounded p-2 hover:bg-green-700"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-green-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;
