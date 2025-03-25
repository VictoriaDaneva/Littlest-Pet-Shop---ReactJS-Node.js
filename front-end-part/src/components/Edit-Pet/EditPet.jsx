import { editPet, getPet } from "../../api/petsApi";
import useAuth from "../../hooks/useAuth";
import { Navigate, useNavigate, useParams, Link } from "react-router";
import { useState, useEffect } from "react";

export default function EditPet() {
  const navigate = useNavigate();
  const { userId, accessToken } = useAuth();
  const { petId } = useParams();
  const { pet } = getPet(petId);

  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    breed: "",
    petType: "",
    description: "",
  });

  useEffect(() => {
    if (pet) {
      setFormData({
        imageUrl: pet.imageUrl || "",
        title: pet.title || "",
        breed: pet.breed || "",
        petType: pet.petType || "",
        description: pet.description || "",
      });
    }
  }, [pet]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!pet || !pet.owner) {
    return <p>Loading pet data...</p>;
  }

  const isOwner = pet?.owner?._id && String(userId) === String(pet.owner._id);

  if (!isOwner) {
    return <Navigate to="/pets" />;
  }
  const formAction = async (event) => {
    event.preventDefault();

    await editPet(petId, formData, accessToken);
    navigate(`/pets/${petId}/details`);
  };

  return (
    <div className="card">
      <h2>Edit a Pet Information</h2>
      <form onSubmit={formAction} className="form">
        <input
          type="url"
          id="image-url"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Pet Name"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="breed"
          name="breed"
          placeholder="Pet Breed"
          value={formData.breed}
          onChange={handleInputChange}
          required
        />
        <select
          id="pet-type"
          name="petType"
          value={formData.petType}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select Pet Type
          </option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="rabbit">Rabbit</option>
        </select>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows="3"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <div className="button-group">
          <button type="submit" className="button-subbmit">
            Save Changes
          </button>
          <Link to={`/pets/${petId}/details`} className="cancel-btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
