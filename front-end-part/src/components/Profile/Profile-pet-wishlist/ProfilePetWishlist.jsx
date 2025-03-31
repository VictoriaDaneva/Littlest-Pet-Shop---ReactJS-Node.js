import { Link } from "react-router";

export default function ProfilePetWishlist({ _id, imageUrl, title, breed }) {
  return (
    <article className="product-card">
      <img src={imageUrl} alt="kotka" className="product-image" />
      <h3 className="product-name">{title}</h3>
      <p className="product-breed">breed: {breed}</p>
      <Link to={`/pets/${_id}/details`} className="details-link">
        See More Details
      </Link>
    </article>
  );
}
