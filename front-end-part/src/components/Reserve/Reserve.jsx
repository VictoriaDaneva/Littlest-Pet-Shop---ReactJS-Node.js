import { Link } from "react-router";
import './Reserve.css'

export default function Reserve() {
    return(
        <>
        <div className="adopt-container">
        <div className="adopt-title-container">
          <h2 className="adopt-title">Adopt a Pet</h2>
          <button className="close-btn">&times;</button>
        </div>
  
        <div className="adopt-pets">
          <p className="no-items">No pets selected for adoption yet :(</p>
  
          <div className="adopt-pet">
            <div className="adopt-pet-image">
              <img src="/bird.png" alt="Pet Image" />
            </div>
            <div className="adopt-pet-details">
              <h3 className="pet-name">Parrot</h3>
              <p className="pet-info">Breed: Macaw</p>
            </div>
            <button className="remove-btn">Remove</button>
          </div>
        </div>
        <div className="adopt-footer">
            <Link to='/checkOut'>
        <button className="adopt-now">Proceed with Adoption</button>
        </Link>
      </div>
        </div>
        
        </>
    )
}