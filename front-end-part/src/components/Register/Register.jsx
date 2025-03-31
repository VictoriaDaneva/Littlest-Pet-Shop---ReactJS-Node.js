import { Link, useNavigate } from "react-router";
import "./Register.css";
import { useRegister } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useRegister();
  const { userLoginHandler } = useUserContext();
  const [errors, setErrors] = useState({});

  const registerHandler = async (event) => {
    event.preventDefault();
    setErrors({});

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    const { username, email, phoneNumber, imageUrl, address, password } =
      values;

    const confirmPassword = values["confirm-password"];

    let newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!imageUrl) newErrors.imageUrl = "Profile image URL is required";
    if (!address) newErrors.address = "Address is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const authData = await register(
        username,
        email,
        phoneNumber,
        imageUrl,
        address,
        password
      );

      if (!authData || !authData.accessToken || !authData.User?._id) {
        throw new Error("Registration failed. Please try again.");
      }

      const formattedAuthData = {
        ...authData.User,
        accessToken: authData.accessToken,
        userId: authData.User._id,
      };

      userLoginHandler(formattedAuthData);
      navigate("/");
    } catch (error) {
      console.error(
        "Registration Error:",
        error.message || "Something went wrong"
      );

      setErrors({
        general: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={registerHandler} className="form">
        {" "}
        <div className="input-container">
          <input type="text" placeholder="Username" name="username" />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </div>
        <div className="input-container">
          <input type="email" placeholder="Email" name="email" />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="input-container">
          <input type="tel" placeholder="Phone Number" name="phoneNumber" />
          {errors.phoneNumber && (
            <p className="error-message">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="input-container">
          <input type="text" placeholder="Image URL" name="imageUrl" />
          {errors.imageUrl && (
            <p className="error-message">{errors.imageUrl}</p>
          )}
        </div>
        <div className="input-container">
          <input type="text" placeholder="Address" name="address" />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>
        <div className="input-container">
          <input type="password" placeholder="Password" name="password" />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Repeat Password"
            name="confirm-password"
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>
        <button className="registerButton" type="submit">
          Register
        </button>
        {errors.general && (
          <p className="error-message general-error">{errors.general}</p>
        )}
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
