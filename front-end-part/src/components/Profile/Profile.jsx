import { Link } from "react-router";
import './Profile.css';

export default function Profile() {
    return(
        <>
        <div className="profile-card">
      <div className="profile-left">
        <div className="profile-image">
          <img src="/primer3.png" alt="Profile Picture" />
        </div>
      </div>
      <div className="profile-right">
        <h2>Profile</h2>
        <p><strong>Name:</strong> User Name</p>
        <p><strong>Email:</strong> mail@expaytech.co</p>
        <p><strong>Phone Number:</strong> +20 01274318900</p>
        <p>
          <strong>Address:</strong> 285 N Broad St, Elizabeth, NJ<br />
          07208, USA
        </p>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>
    </div>

    <section className="recommended-items">
      <h2>Your Wishlist 🐾🪶</h2>
      <div className="product-grid">
        <article className="product-card">
          <img src="/primer2.png" alt="kotka" className="product-image" />
          <h3 className="product-name">Peppermint Matcha</h3>
          <p className="product-breed">breed: idk</p>
          <Link to="/pet" className="details-link">See More Details</Link>
        </article>
        <article className="product-card">
          <img src="/primer1.png" alt="kotka" className="product-image" />
          <h3 className="product-name">Holiday Blend</h3>
          <p className="product-breed">breed: nona</p>
          <Link to="/pet" className="details-link"
            >See More Details</Link>
        </article>
      </div>
    </section>
    </>
    )
}