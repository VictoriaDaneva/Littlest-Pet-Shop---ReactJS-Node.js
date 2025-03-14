import { Link } from "react-router";
import { useState } from "react";
import "./Create.css";

export default function Create() {
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    breed: "",
    author: "",
    petType: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="card">
      <h2>Post a Pet</h2>
      <form className="form">
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          required
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Pet Name"
          required
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="breed"
          placeholder="Pet Breed"
          required
          value={formData.breed}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          required
          value={formData.author}
          onChange={handleChange}
        />

        <select
          name="petType"
          required
          value={formData.petType}
          onChange={handleChange}
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
          name="description"
          placeholder="Description"
          rows="3"
          required
          value={formData.description}
          onChange={handleChange}
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
