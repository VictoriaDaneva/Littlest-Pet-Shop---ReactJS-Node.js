import { Link } from "react-router";
import './Login.css';
//value=""
export default function Login() {
    return(
        <div className="card">
      <h2>Login</h2>
      <form action="" className="form">
        <input type="email" placeholder="email"  />
        <input type="password" placeholder="password" />
        <button className="loginButton">Sign in</button>
      </form>
      <p className="footer">Need an account? Sign up <Link to="/signUp" className="link">here</Link></p>
    </div>
    )
}