import { useForm } from "react-hook-form";
import axios from "axios";
import notyf from "../../utils/notyf";
import type { AuthForm } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>();

  const onsubmit = async (data: AuthForm) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        data,
      );
      notyf.success(response.data.message);
      navigate('/login')
    } catch (error: any) {
      notyf.error(error.response?.data?.message);
    }
  };


return (
  <div className="flex justify-center mt-20">
    <div className="w-80">
      <h1 className="text-2xl font-bold text-center mb-6">
        Welcome!
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
          className="w-full rounded bg-green-600 p-2 text-white hover:bg-green-700"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-green-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  </div>
);
}

export default Register;
