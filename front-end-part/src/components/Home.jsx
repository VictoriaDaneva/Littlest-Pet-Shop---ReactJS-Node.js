import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">Paws for Love</h1>
          <p className="hero-subtext">Because love is fur real🐾❤️</p>
          <Link to="/pets">
            <button className="hero-button">Discover now</button>
          </Link>
        </div>
      </div>

      <section className="explore-category">
        <div className="category-header">
          <h2>Explore By Category</h2>
          <Link to="/pets" className="view-all">
            View All →
          </Link>
        </div>
        <div className="categories">
          <Link
            to="/dogs"
            className="category-card"
            style={{ backgroundColor: "#c8e6c9" }}
          >
            <img src="/dog.png" alt="Dog" />
            <h3>Dog</h3>
          </Link>
          <Link
            to="/rabbits"
            className="category-card"
            style={{ backgroundColor: "#ffecb3" }}
          >
            <img src="/bunny.png" alt="Rabbit" />
            <h3>Rabbit</h3>
          </Link>
          <Link
            to="/cats"
            className="category-card"
            style={{ backgroundColor: "#ffccbc" }}
          >
            <img src="/kitty.png" alt="Cat" />
            <h3>Cat</h3>
          </Link>
          <Link
            to="/birds"
            className="category-card"
            style={{ backgroundColor: "#e1bee7" }}
          >
            <img src="/bird.png" alt="Bird" />
            <h3>Bird</h3>
          </Link>
        </div>
      </section>

      <section className="products-section">
        <h2 className="products-heading">Our latest buddies</h2>
        <div className="product-cards">
          <Link to="/pet" className="product-card">
            <div>
              <img
                src="primer1.png"
                alt="Nona slona"
                className="product-image"
              />
              <p className="product-title">Nona slona</p>
              <p className="product-breed">breed: idk</p>
              <Link to="/profile">
                <button className="wishlist-button">Add to Wishlist</button>
              </Link>
            </div>
          </Link>
        </div>
      </section>

      <div className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>created by</h2>
            <h1>victoria daneva</h1>
            <p>
              At Littlest Pet Shop, we believe that every pet deserves a loving
              home. Our mission is to connect adorable, loyal companions with
              caring individuals who are ready to open their hearts and homes.
            </p>
            <p>
              Adopting a pet is more than just bringing an animal into your
              home—it's gaining a lifelong friend, a source of unconditional
              love, and a reason to smile every day. We are committed to making
              the adoption process easy, transparent, and filled with joy. Every
              pet deserves a chance at happiness, and together, we can give them
              that.
            </p>
            <button className="about-button">
              <Link to="/about-us">learn more</Link>
            </button>
          </div>
          <div className="about-image">
            <img
              src="/about-us.png"
              alt="Cute pets sitting around in pink backgroud color"
            />
          </div>
        </div>
      </div>
    </>
  );
}
