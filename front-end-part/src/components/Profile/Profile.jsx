import { useProfile } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import "./Profile.css";

export default function Profile() {
  const { username, email, phoneNumber, address, imageUrl, userId } =
    useUserContext();
  const { fetchProfile } = useProfile();
  const [isProfileFetched, setIsProfileFetched] = useState(false);

  useEffect(() => {
    if (userId && !isProfileFetched) {
      fetchProfile();
      setIsProfileFetched(true);
    }
  }, [userId, isProfileFetched]);

  return (
    <>
      <div className="profile-card">
        <div className="profile-left">
          <div className="profile-image">
            <img src={imageUrl} alt="" />
          </div>
        </div>
        <div className="profile-right">
          <h2>Profile</h2>
          <p>
            <strong>Name:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone Number:</strong> {phoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>
          <Link to={`/profile/edit/${userId}`}>
            <button className="edit-profile-btn">Edit Profile</button>
          </Link>
        </div>
      </div>

      <section className="recommended-items">
        <h2>Your Wishlist 🐾🪶</h2>
        <div className="product-grid">
          <article className="product-card">
            <img src="/primer2.png" alt="kotka" className="product-image" />
            <h3 className="product-name">Peppermint Matcha</h3>
            <p className="product-breed">breed: idk</p>
            <Link to="/pet" className="details-link">
              See More Details
            </Link>
          </article>
          <article className="product-card">
            <img src="/primer1.png" alt="kotka" className="product-image" />
            <h3 className="product-name">Holiday Blend</h3>
            <p className="product-breed">breed: nona</p>
            <Link to="/pet" className="details-link">
              See More Details
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
