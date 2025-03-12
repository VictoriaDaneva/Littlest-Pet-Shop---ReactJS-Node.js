import { Link } from "react-router";
import './Pet.css'
export default function Pet() {
    return(
        <>
        <section className="product-details-page">
      <div className="product-details">
        <div className="product-image">
          <img
            src="/primer1.png"
            alt="Nona"
            className="main-image"
          />
        </div>
        <div className="product-info">
          <h1 itemprop="name">Nonka Slonka</h1>
          <p className="product-breed" name="breed">breed: nonaka bonbonka</p>
          <p className="product-type" name="type">Type: Cat</p>
          <p className="product-description" name="description">
            Our limited edition Chocolate Matcha is made from pure Cameroonian
            cacao and green tea that retains its rich flavor. It’s gluten-free,
            packed with antioxidants, and perfect for a health boost!
          </p>

          <div className="wishlist-actions">
            <button className="wishlist-button">Wishlist</button>
            <button className="edit-button">Edit</button>
            <button className="delete-button">Delete</button>
            <button className="wishlist-button">Adopt</button>
          </div>
        </div>
      </div>
    </section>

    <section className="recommended-items">
      <h2>Recommended Items</h2>
      <div className="product-grid">
        <article className="product-card">
          <img
            src="/primer2.png"
            alt="Kotence"
            className="product-image"
          />
          <h3 className="product-name">Kotence</h3>
          <p className="product-breed">breed: idk</p>
          <Link to="/pet" className="details-link"
            >See More Details</Link>
        </article>
        </div>
    </section>
        </>
    )
}