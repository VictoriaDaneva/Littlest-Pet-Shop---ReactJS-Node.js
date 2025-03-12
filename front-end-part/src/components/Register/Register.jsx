import { Link } from "react-router";
import './Register.css'


export default function Register() {
    return(
        <div className="card">
      <h2>Register</h2>
      <form action="" className="form">
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Phone Number" />
        <input type="text" placeholder="Address" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Repeat Password" />
        <button className="registerButton">Register</button>
      </form>
      <p className="footer">Already have an account? <Link to="/login" className="link">Log in here</Link></p>
    </div>
    )
}