import { Link } from "react-router";
import "./ChekOut.css";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { getCartPet } from "../../api/petsApi";
import CheckOutPet from "./ChekOut-pet/CheckOutPet";

export default function ChekOut() {
  const { accessToken } = useAuth();
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const fetchCartList = async () => {
      try {
        const response = await getCartPet(accessToken);
        setCartList(response);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (accessToken) {
      fetchCartList();
    }
  }, [accessToken]);
  return (
    <div className="checkout-container">
      <div className="form-section">
        <h2 className="section-title">Contact</h2>
        <input type="email" placeholder="Email" required />
        <label htmlFor="adoptionDate">Preferred Adoption Date:</label>
        <input type="date" id="adoptionDate" name="adoptionDate" required />

        <h2 className="section-title">Adopter Information</h2>
        <div className="input-row">
          <input type="text" placeholder="First Name" id="firstName" required />
          <input type="text" placeholder="Last Name" id="lastName" required />
        </div>
        <input
          type="text"
          placeholder="Phone Number"
          id="phoneNumber"
          required
        />
        <input type="text" placeholder="Address" id="address" required />
        <Link to="/thank-you">
          <button className="reserve-btn">Reserve Pet</button>
        </Link>
      </div>

      <div className="summary-section">
        <h2 className="section-title">Reservation Summary</h2>
        <div className="pets-list">
          {cartList.map((pet) => (
            <CheckOutPet key={pet._id} {...pet} />
          ))}
        </div>
      </div>
    </div>
  );
}
