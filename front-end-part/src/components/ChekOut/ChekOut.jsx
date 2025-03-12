import { Link } from "react-router";
import './ChekOut.css'


export default function ChekOut() {
    return(
        <div className="checkout-container">
      <div className="form-section">
        <h2 className="section-title">Contact</h2>
        <input type="email" placeholder="Email" required />
        <label htmlFor="adoption-date">Preferred Adoption Date:</label>
        <input type="date" id="adoption-date" name="adoption-date" required />

        <h2 className="section-title">Adopter Information</h2>
        <div className="input-row">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <input type="text" placeholder="Phone Number" required />
        <input type="text" placeholder="Address" required />
        <Link to='/thank-you'>
        <button className="reserve-btn">Reserve Pet</button>
        </Link>
      </div>

      <div className="summary-section">
        <h2 className="section-title">Reservation Summary</h2>
        <div className="pet-summary">
          <img src="/dog.png" alt="Pet Image" />
          <div>
            <h3>Golden Retriever Puppy</h3>
            <p>Estimated Fee: <strong>Free</strong></p>
          </div>
        </div>
      </div>
    </div>
    )
}