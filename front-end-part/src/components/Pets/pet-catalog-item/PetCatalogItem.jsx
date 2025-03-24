import { Link } from "react-router";

export default function PetCatalogItem({ _id, imageUrl, title, breed }) {
  return (
    <div className="products-grid">
      <Link to={`/pets/${_id}/details`} className="card-link">
        <article className="product-card">
          <img src={imageUrl} className="product-image" />
          <div className="product-details">
            <h2 className="product-name">{title}</h2>
            <p className="product-breed">Breed: {breed}</p>
            <button className="details-button">See More Details</button>
          </div>
        </article>
      </Link>
    </div>
  );
}
