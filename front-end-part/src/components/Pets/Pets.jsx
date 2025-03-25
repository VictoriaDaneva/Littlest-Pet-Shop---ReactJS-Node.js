import { Link } from "react-router";
import "./Pets.css";
import { getPets } from "../../api/petsApi";
import PetCatalogItem from "./pet-catalog-item/PetCatalogItem";

export default function Pets() {
  const { pets } = getPets();
  return (
    <section className="catalog">
      <header>
        <h1>View all pets 🐾</h1>
        <p>Total Pets: {pets.length}</p>

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
      <div className="items-section products-grid">
        {pets.length > 0 ? (
          pets.map((pet) => <PetCatalogItem key={pet._id} {...pet} />)
        ) : (
          <h3 className="no-pets">No pets yet</h3>
        )}
      </div>
    </section>
  );
}
