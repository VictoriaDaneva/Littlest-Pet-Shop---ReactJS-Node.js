import { Link, useNavigate } from "react-router";
import "./Login.css";
import { useActionState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useLogin } from "../../api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const { userLoginHandler } = useContext(UserContext);
  const { login } = useLogin();

  const loginHandler = async (_, formData) => {
    const values = Object.fromEntries(formData);
    const authData = await login(values.email, values.password);

    if (!authData || !authData.accessToken || !authData.User?._id) {
      console.error("Login failed: Missing token or user ID", authData);
      return;
    }

    const formattedAuthData = {
      ...authData.User,
      accessToken: authData.accessToken,
      userId: authData.User._id,
    };
    console.log("Formatted Login Data:", formattedAuthData);

    userLoginHandler(formattedAuthData);
    navigate(-1);
  };

  const [_, loginAction, isPending] = useActionState(loginHandler, {
    email: "",
    password: "",
  });

  return (
    <div className="card">
      <h2>Login</h2>
      <form action={loginAction} className="form">
        <input type="email" placeholder="email" name="email" id="email" />
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
        />
        <button
          type="submit"
          className="loginButton"
          value="Login"
          disabled={isPending}
        >
          Sign in
        </button>
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
