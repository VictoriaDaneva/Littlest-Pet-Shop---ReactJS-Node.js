import { Link, useNavigate } from "react-router";
import "./Register.css";
import { useRegister } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useRegister();
  const { userLoginHandler } = useUserContext();

  const registerHandler = async (formData) => {
    const { username, email, phoneNumber, address, password } =
      Object.fromEntries(formData);

    const confirmPassword = formData.get("confirm-password");

    if (password !== confirmPassword) {
      console.log("Password missmatch");

      return;
    }

    const authData = await register(
      username,
      email,
      phoneNumber,
      address,
      password
    );

    console.log("Auth Data after Register:", authData);

    if (authData && authData.accessToken) {
      userLoginHandler(authData);
      navigate("/");
    } else {
      console.error("Registration failed: No accessToken received");
    }
  };
  return (
    <div className="card">
      <h2>Register</h2>
      <form action={registerHandler} className="form">
        <input
          type="text"
          placeholder="Username"
          id="username"
          name="username"
        />
        <input type="email" placeholder="Email" id="email" name="email" />
        <input
          type="tel"
          placeholder="Phone Number"
          id="phoneNumber"
          name="phoneNumber"
        />
        <input type="text" placeholder="Address" id="address" name="address" />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="register-password"
        />
        <input
          type="password"
          placeholder="Repeat Password"
          name="confirm-password"
          id="confirm-password"
        />
        <button className="registerButton" type="submit" value="Register">
          Register
        </button>
      </form>
      <p className="footer">
        Already have an account?{" "}
        <Link to="/login" className="link">
          Log in here
        </Link>
      </p>
    </div>
  );
}
