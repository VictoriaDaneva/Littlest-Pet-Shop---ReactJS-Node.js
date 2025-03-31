import { Link, useNavigate } from "react-router";
import "./Login.css";
import { useActionState, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useLogin } from "../../api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const { userLoginHandler } = useContext(UserContext);
  const { login } = useLogin();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const loginHandler = async (_, formData) => {
    setErrors({ email: "", password: "", general: "" });
    const values = Object.fromEntries(formData);

    if (!values.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    if (!values.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    try {
      const authData = await login(values.email, values.password);

      if (!authData || !authData.accessToken || !authData.User?._id) {
        throw new Error("Invalid email or password. Please try again.");
      }

      const formattedAuthData = {
        ...authData.User,
        accessToken: authData.accessToken,
        userId: authData.User._id,
      };

      userLoginHandler(formattedAuthData);
      navigate(-1);
    } catch (error) {
      console.error("Login Error:", error.message || "Something went wrong");
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Something went wrong. Please try again.",
      }));
    }
  };

  const [_, loginAction, isPending] = useActionState(loginHandler, {
    email: "",
    password: "",
  });

  return (
    <div className="card">
      <h2>Login</h2>
      <form action={loginAction} className="form">
        <div className="input-container">
          <input type="email" placeholder="Email" name="email" id="email" />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="loginButton"
          value="Login"
          disabled={isPending}
        >
          Sign in
        </button>

        {errors.general && (
          <p className="error-message general-error">{errors.general}</p>
        )}
      </form>
      <p className="footer">
        Need an account? Sign up{" "}
        <Link to="/signUp" className="link">
          here
        </Link>
      </p>
    </div>
  );
}
