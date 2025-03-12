import { Link } from "react-router";
import "./Pets.css";

export default function Pets() {
  return (
    <section className="catalog">
      <header>
        <h1>View all pets 🐾</h1>
        <p>Total Pets: 48</p>

        <div className="dropdown">
          <button className="dropbtn">Select Pet Type</button>
          <div className="dropdown-content">
            <Link to="/pets" data-filter="all">
              {" "}
              All Pets
            </Link>
            <Link to="/dogs" data-filter="dog">
              <img src="/dog.png" alt="Dog" /> Dogs
            </Link>
            <Link to="/cats" data-filter="cat">
              <img src="/kitty.png" alt="Cat" /> Cats
            </Link>
            <Link to="/birds" data-filter="bird">
              <img src="/bird.png" alt="Bird" /> Birds
            </Link>
            <Link to="/rabbits" data-filter="rabbit">
              <img src="/bunny.png" alt="Rabbit" /> Rabbits
            </Link>
          </div>
        </div>
      </header>

      <div className="products-grid">
        <Link to="/pet" className="card-link">
          <article className="product-card">
            <img src="/primer2.png" alt="kotka" className="product-image" />
            <div className="product-details">
              <h2 className="product-name">Macata</h2>
              <p className="product-breed">Breed: kote</p>
              <p className="product-description">
                A medium roast ground coffee, perfect for the holiday season.
              </p>
              <button className="details-button">See More Details</button>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}
