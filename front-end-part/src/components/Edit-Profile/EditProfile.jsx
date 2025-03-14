export default function EditProfile() {
  return (
    <div className="card">
      <h2>Edit Profile</h2>
      <form action="" method="post" className="form">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value="User Name"
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value="mail@expaytech.co"
          required
        />
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone Number"
          value="+20 01274318900"
          required
        />
        <textarea
          id="address"
          name="address"
          placeholder="Address"
          rows="3"
          required
        >
          285 N Broad St, Elizabeth, NJ, 07208, USA
        </textarea>
        <button type="submit">Save Changes</button>
        <button type="button" className="cancel-btn">
          Cancel
        </button>
      </form>
    </div>
  );
}
