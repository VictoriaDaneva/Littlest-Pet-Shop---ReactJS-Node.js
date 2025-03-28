import { Link, useSearchParams } from "react-router";
import "./Search.css";
import { useEffect, useState } from "react";
import { searchPets } from "../../api/petsApi";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await searchPets(query);
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);
  return (
    <div className="search-page">
      <header>
        <h2>Search Results for "{query}"</h2>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {results.length === 0 && !loading && !error && (
        <div className="no-results">
          <img
            src="https://media1.tenor.com/m/9PTGVf4BLwYAAAAC/crying-emoji-dies.gif"
            alt="No results found"
            className="no-results-image"
          />
          <h3 className="no-results-text">
            Oops! No results found for "{query}"
          </h3>
          <p className="no-results-description">
            Try searching for something else or browse our catalog.
          </p>
          <Link to="/pets" className="redirect-button">
            Browse Catalog
          </Link>
        </div>
      )}

      <div className="product-grid-search">
        {results.map((pet) => (
          <Link
            to={`/pets/${pet._id}/details`}
            key={pet._id}
            className="pet-card-link"
          >
            <article className="product-card-search">
              <img
                src={pet.imageUrl || "/kitty.png"}
                className="product-image-search"
                alt={pet.title}
              />
              <div className="product-details-search">
                <h2 className="product-name-search">{pet.title}</h2>
                <p className="product-description-search">{pet.description}</p>
                <button
                  className="details-button-search"
                  aria-label="See more details"
                >
                  See More Details
                </button>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
