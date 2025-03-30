import { Link, useNavigate } from "react-router";
import "./ChekOut.css";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { getCartPet, reservePet } from "../../api/petsApi";
import CheckOutPet from "./ChekOut-pet/CheckOutPet";

export default function ChekOut() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [cartList, setCartList] = useState([]);
  const reserve = reservePet();

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

  const submitAction = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);

    const petIds = cartList.map((pet) => pet._id);

    const reservePetData = {
      email: userData.email,
      adoptionDate: userData.adoptionDate,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      products: petIds,
    };

    try {
      await reserve(reservePetData);
      navigate("/thank-you");
    } catch (error) {
      console.error("Failed to create reservation:", error);
    }
  };
  return (
    <div className="checkout-container">
      <form className="form-section" onSubmit={submitAction}>
        <h2 className="section-title">Contact</h2>
        <input type="email" name="email" placeholder="Email" required />
        <label htmlFor="adoptionDate">Preferred Adoption Date:</label>
        <input type="date" id="adoptionDate" name="adoptionDate" required />

        <h2 className="section-title">Adopter Information</h2>
        <div className="input-row">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            id="firstName"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            id="lastName"
            required
          />
        </div>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          id="phoneNumber"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          id="address"
          required
        />
        <button className="reserve-btn" type="submit">
          Reserve Pet
        </button>
      </form>

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
