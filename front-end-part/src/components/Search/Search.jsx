import { Link } from "react-router";
import "./Search.css";

export default function SearchPage() {
  return (
    <div className="search-page">
      <header>
        <h2>Search Results for ....</h2>
      </header>

      <div class="no-results">
        <img
          src="https://media1.tenor.com/m/9PTGVf4BLwYAAAAC/crying-emoji-dies.gif"
          alt="No results found"
          className="no-results-image"
        />
        <h3 className="no-results-text">Oops! No results found for ...</h3>
        <p className="no-results-description">
          Try searching for something else or browse our catalog.
        </p>
        <Link to="/pets" className="redirect-button">
          Browse Catalog
        </Link>
      </div>
      <div className="product-grid-search">
        <Link to="/pet" className="pet-card-link">
          <article className="product-card-search">
            <img src="/kitty.png" className="product-image-search" />
            <div className="product-details-search">
              <h2 className="product-name-search"> BLQLQLQ</h2>
              <p className="product-description-searck"></p>

              <button
                className="details-button-search"
                aria-label="See more details"
              >
                See More Details
              </button>
            </div>
          </article>
        </Link>
      </div>
    </div>
  );
}
