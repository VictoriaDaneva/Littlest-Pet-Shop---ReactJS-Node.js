export default function CheckOutPet({ _id, imageUrl, title }) {
  return (
    <div className="pet-summary">
      <img src={imageUrl} alt="Pet Image" />
      <div>
        <h3>{title}</h3>
        <p>
          Estimated Fee: <strong>Free</strong>
        </p>
      </div>
    </div>
  );
}
