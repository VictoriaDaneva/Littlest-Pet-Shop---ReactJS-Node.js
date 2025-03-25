import { useNavigate, Link } from "react-router";
import "./EditProfile.css";
import { useUserContext } from "../../contexts/UserContext";
import { editProfile, useProfile } from "../../api/authApi";
import { useState, useEffect } from "react";

export default function EditProfile() {
  const navigate = useNavigate();
  const {
    userLoginHandler,
    userId,
    username,
    email,
    phoneNumber,
    imageUrl,
    address,
    accessToken,
  } = useUserContext();
  const { fetchProfile } = useProfile();
  const [isProfileFetched, setIsProfileFetched] = useState(false);

  const [formData, setFormData] = useState({
    username: username || "",
    email: email || "",
    phoneNumber: phoneNumber || "",
    imageUrl: imageUrl || "",
    address: address || "",
  });

  useEffect(() => {
    if (userId && !isProfileFetched) {
      fetchProfile();
      setIsProfileFetched(true);
    }
  }, [userId, isProfileFetched]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const editProfileHandler = async (event) => {
    event.preventDefault();

    try {
      const updatedUserData = await editProfile(userId, formData, accessToken);

      userLoginHandler({
        ...updatedUserData,
        accessToken: accessToken,
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="card">
      <h2>Edit Profile</h2>
      <form onSubmit={editProfileHandler} className="form">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder="ImageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
          required
        />
        <textarea
          id="address"
          name="address"
          placeholder="Address"
          rows="3"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="button-subbmit">
          Save Changes
        </button>
        <Link to="/profile" className="cancel-btn">
          Cancel
        </Link>
      </form>
    </div>
  );
}
