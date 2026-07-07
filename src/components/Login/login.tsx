import { useForm } from "react-hook-form";
import axios from "axios";

type LoginForm = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onsubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", data);
      console.log("response", response);
    } catch (error) {
      console.log(error);
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
