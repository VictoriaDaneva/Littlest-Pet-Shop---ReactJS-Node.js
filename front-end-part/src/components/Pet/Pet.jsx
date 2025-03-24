import { Link, useNavigate, useParams } from "react-router";
import "./Pet.css";
import useAuth from "../../hooks/useAuth";
import { getPet, useDeletePet } from "../../api/petsApi";
export default function Pet() {
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useAuth();
  const { petId } = useParams();
  const { pet } = getPet(petId);
  const deletePet = useDeletePet();

  if (!pet) {
    return <p>Loading...</p>;
  }
  const petDeleteClickHandler = async () => {
    const hasConfirm = confirm(`Are you sure you want to delete ${pet.title}?`);
    if (!hasConfirm) return;

    await deletePet(petId);
    navigate("/pets");
  };
  const isOwner = userId === pet.owner;

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
                  <button className="wishlist-button">Wishlist</button>
                  <button className="wishlist-button">Adopt</button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="recommended-items">
        <h2>Recommended Items</h2>
        <div className="product-grid-pet">
          <article className="product-card">
            <img src="/primer2.png" alt="Kotence" className="product-image" />
            <h3 className="product-name">Kotence</h3>
            <p className="product-breed">breed: idk</p>
            <Link to="/pet" className="details-link">
              See More Details
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
