import { useState, useEffect } from "react";
import { getPets } from "../../api/petsApi";
import PetCatalogItem from "./pet-catalog-item/PetCatalogItem";
import "./Pets.css";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("all");

  useEffect(() => {
    async function fetchPets() {
      const allPets = await getPets();
      setPets(allPets);
      setFilteredPets(allPets);
    }
    fetchPets();
  }, []);

  useEffect(() => {
    if (selectedBreed === "all") {
      setFilteredPets(pets);
    } else {
      setFilteredPets(
        pets.filter((pet) => pet.petType.toLowerCase() === selectedBreed)
      );
    }
  }, [selectedBreed, pets]);

  return (
    <section className="catalog">
      <header>
        <h1>View all pets 🐾</h1>
        <p>Total Pets: {filteredPets.length}</p>

        <div className="dropdown">
          <button className="dropbtn">Select Pet Type</button>
          <div className="dropdown-content">
            <button onClick={() => setSelectedBreed("all")}>All Pets</button>
            <button onClick={() => setSelectedBreed("dog")}>
              <img src="/dog.png" alt="Dog" /> Dogs
            </button>
            <button onClick={() => setSelectedBreed("cat")}>
              <img src="/kitty.png" alt="Cat" /> Cats
            </button>
            <button onClick={() => setSelectedBreed("bird")}>
              <img src="/bird.png" alt="Bird" /> Birds
            </button>
            <button onClick={() => setSelectedBreed("rabbit")}>
              <img src="/bunny.png" alt="Rabbit" /> Rabbits
            </button>
          </div>
        </div>
      </header>

      <div className="items-section products-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => <PetCatalogItem key={pet._id} {...pet} />)
        ) : (
          <h3 className="no-pets">No pets available</h3>
        )}
      </div>
    </section>
  );
}
