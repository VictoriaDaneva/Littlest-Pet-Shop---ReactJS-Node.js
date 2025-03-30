export default function AdoptPet({ _id, imageUrl, title, breed }) {
  return (
    <div className="adopt-pet">
      <div className="adopt-pet-image">
        <img src={imageUrl} alt="Pet Image" />
      </div>
      <div className="adopt-pet-details">
        <h3 className="pet-name">{title}</h3>
        <p className="pet-info">Breed: {breed}</p>
      </div>
      <button className="remove-btn">Remove</button>
    </div>
  );
}
