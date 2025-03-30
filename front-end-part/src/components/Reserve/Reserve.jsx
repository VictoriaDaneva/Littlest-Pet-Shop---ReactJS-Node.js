import { Link } from "react-router";
import "./Reserve.css";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { getCartPet, useRemoveCartPet } from "../../api/petsApi";
import AdoptPet from "./adopt-pet/AdoptPet";

export default function Reserve() {
  const { accessToken } = useAuth();
  const [cartList, setCartList] = useState([]);
  const removeCartPet = useRemoveCartPet();

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

  const removePet = async (petId) => {
    try {
      await removeCartPet(petId);
      setCartList((prevList) => prevList.filter((pet) => pet._id !== petId));
    } catch (error) {
      console.error("Error removing pet:", error);
    }
  };
  return (
    <div className="adopt-container">
      <div className="adopt-title-container">
        <h2 className="adopt-title">Adopt a Pet</h2>
        <button className="close-btn">&times;</button>
      </div>

      <div className="adopt-pets">
        {cartList.length > 0 ? (
          <>
            {cartList.map((pet) => (
              <AdoptPet key={pet._id} {...pet} onRemove={removePet} />
            ))}
            <div className="adopt-footer">
              <Link to="/checkOut">
                <button className="adopt-now">Proceed with Adoption</button>
              </Link>
            </div>
          </>
        ) : (
          <p className="no-items">No pets selected for adoption yet :(</p>
        )}
      </div>
    </div>
  );
}
