import { useProfile } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import "./Profile.css";
import { getWishlistPet } from "../../api/petsApi";
import useAuth from "../../hooks/useAuth";
import ProfilePetWishlist from "./Profile-pet-wishlist/ProfilePetWishlist";

export default function Profile() {
  const { username, email, phoneNumber, address, imageUrl, userId } =
    useUserContext();
  const { fetchProfile } = useProfile();
  const { accessToken } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [isProfileFetched, setIsProfileFetched] = useState(false);

  useEffect(() => {
    if (userId && !isProfileFetched) {
      fetchProfile();
      setIsProfileFetched(true);
    }
  }, [userId, isProfileFetched]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlistPet(accessToken);
        setWishlist(response);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (accessToken) {
      fetchWishlist();
    }
  }, [accessToken]);

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
          {wishlist.length > 0 ? (
            wishlist.map((pet) => <ProfilePetWishlist key={pet._id} {...pet} />)
          ) : (
            <h3 className="no-pets">No pets in the wishlist yet</h3>
          )}
        </div>
      </section>
    </>
  );
}
