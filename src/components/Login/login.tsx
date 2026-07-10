import { useForm } from "react-hook-form";
import axios from "axios";
import notyf from "../../utils/notyf";
import type { LoginResponse, AuthForm } from "../../types/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/authslice";
import { useNavigate } from "react-router-dom";

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
      notyf.success(response.data.message);
      navigate("/sell");
    } catch (error: any) {
      notyf.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <h1>Welecome Back!</h1>
      <form onSubmit={handleSubmit(onsubmit)}>
        <input
          className="border"
          type="email"
          placeholder="enter email"
          {...register("email", {
            required: "Email is required ",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          className="border"
          type="password"
          placeholder="enter password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be 6 charecters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
