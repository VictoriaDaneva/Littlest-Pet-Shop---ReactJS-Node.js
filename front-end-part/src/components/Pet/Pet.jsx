import { Link, useNavigate, useParams } from "react-router";
import "./Pet.css";
import useAuth from "../../hooks/useAuth";
import {
  getPet,
  getWishlistPet,
  useCartPet,
  useDeletePet,
  useLatestThreePets,
  useUnsubscribePet,
  useWishlistPet,
} from "../../api/petsApi";
import { useEffect, useState } from "react";
import PetCatalogItem from "../Pets/pet-catalog-item/PetCatalogItem";
export default function Pet() {
  const navigate = useNavigate();
  const { userId, isAuthenticated, accessToken } = useAuth();
  const { petId } = useParams();
  const { pet } = getPet(petId);
  const deletePet = useDeletePet();
  const wishlistPet = useWishlistPet();
  const unsubscribePet = useUnsubscribePet();
  const { latestPets } = useLatestThreePets();
  const cartPet = useCartPet();

  const [isLiked, setIsLiked] = useState(false);

  if (!pet) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    const checkIfLiked = async () => {
      if (isAuthenticated && accessToken) {
        try {
          const response = await getWishlistPet(accessToken);

          if (Array.isArray(response)) {
            const isInWishlist = response.some((item) => item._id === petId);
            setIsLiked(isInWishlist);
          } else {
            console.error(
              "Expected response to be an array, but got:",
              response
            );
          }
        } catch (error) {
          console.error("Error checking if pet is in wishlist", error);
        }
      }
    };

    checkIfLiked();
  }, [petId, isAuthenticated, accessToken]);

  const petCartHandler = async () => {
    await cartPet(petId);
    navigate("/reserve");
  };

  const petWishlistHandler = async () => {
    await wishlistPet(petId);
    setIsLiked(true);
    navigate("/profile");
  };

  const petUnsubscribeHandler = async () => {
    await unsubscribePet(petId);
    setIsLiked(false);
    navigate("/profile");
  };

  const petDeleteClickHandler = async () => {
    const hasConfirm = confirm(`Are you sure you want to delete ${pet.title}?`);
    if (!hasConfirm) return;

    await deletePet(petId);
    navigate("/pets");
  };

  const isOwner = pet?.owner?._id && userId === pet.owner._id;

  return (
    <>
      <section className="product-details-page">
        <div className="product-details-pet">
          <div className="product-image">
            <img src={pet.imageUrl} alt="Nona" className="main-image" />
          </div>
          <div className="product-info">
            <h1>{pet.title}</h1>
            <p className="product-breed" name="breed">
              breed: {pet.breed}
            </p>
            <p className="product-type" name="type">
              Type: {pet.petType}
            </p>
            <p className="product-description" name="description">
              {pet.description}
            </p>

            <div className="wishlist-actions">
              {isOwner ? (
                <>
                  <Link to={`/pets/${petId}/edit`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                  <button
                    onClick={petDeleteClickHandler}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </>
              ) : isAuthenticated ? (
                <>
                  {!isLiked && (
                    <button
                      onClick={petWishlistHandler}
                      className="wishlist-button"
                    >
                      Wishlist
                    </button>
                  )}
                  {isLiked && (
                    <button
                      onClick={petUnsubscribeHandler}
                      className="wishlist-button"
                    >
                      Unsubscribe
                    </button>
                  )}
                  <button onClick={petCartHandler} className="wishlist-button">
                    Adopt
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="recommended-items">
        <h2>Recommended Pets</h2>
        <div className="product-grid-pet">
          {latestPets.length > 0 ? (
            latestPets.map((pet) => (
              <div key={pet._id} className="pet-product-card">
                <img src={pet.imageUrl} alt={pet.name} />
                <div className="pet-product-details">
                  <h3 className="pet-product-name">{pet.name}</h3>
                  <p className="pet-product-breed">{pet.breed}</p>
                  <p className="pet-product-description">{pet.description}</p>
                  <Link to={`/pets/${pet._id}/details`}>
                    <button className="pet-details-button">View Details</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h3 className="no-pets">No new pets available</h3>
          )}
        </div>
      </section>
    </>
  );
}
