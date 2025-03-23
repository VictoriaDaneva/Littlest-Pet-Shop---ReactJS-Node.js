import { Link, useNavigate } from "react-router";
import "./Create.css";
import { createPet } from "../../api/petsApi";

export default function Create() {
  const navigate = useNavigate();
  const postPet = createPet();

  const submitAction = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const petData = Object.fromEntries(formData);

    try {
      await postPet(petData);
      navigate("/pets");
    } catch (error) {
      console.error("Failed to create pet:", error);
    }
  };

  return (
    <div className="card">
      <h2>Post a Pet</h2>
      <form onSubmit={submitAction} className="form">
        <input type="url" name="imageUrl" placeholder="Image URL" required />
        <input type="text" name="title" placeholder="Pet Name" required />
        <input type="text" name="breed" placeholder="Pet Breed" required />
        <input type="text" name="author" placeholder="Author" required />

        <select name="petType" required>
          <option value="" disabled>
            Select Pet Type
          </option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="rabbit">Rabbit</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          rows="3"
          required
        ></textarea>

        <div className="button-group">
          <button type="submit" className="buttonCreate">
            Create
          </button>
          <Link to="/pets" className="buttonCreate linkButton">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
