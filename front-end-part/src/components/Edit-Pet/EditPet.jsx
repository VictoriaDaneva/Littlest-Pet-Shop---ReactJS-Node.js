export default function editPet() {
  return (
    <div className="card">
      <h2>Edit a Pet Information</h2>
      <form action="/update-product" method="post" className="form">
        <input
          type="url"
          id="image-url"
          name="imageUrl"
          placeholder="Image URL"
          required
        />
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Pet Name"
          required
        />

        <input
          type="text"
          id="bred"
          name="breed"
          placeholder="Pet Breed"
          required
        />
        <input
          type="text"
          id="type"
          name="author"
          placeholder="Author"
          required
        />
        <select
          id="pet-type"
          name="pet-type"
          placeholder="Select Pet Type"
          required
        >
          <option value="" disabled selected>
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
          required
        ></textarea>
        <div className="button-group">
          <button type="submit">Save Changes</button>
          <button type="button" className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
