import { Link } from "react-router";
import "./ThankYou.css";

export default function ThankYou() {
  return (
    <div className="thank-you-container">
      <div className="thank-you-text">
        <h1 className="thank-you-h1">Thank You!</h1>
        <p className="thank-you-p">
          Thank you for saving an hour and your future furry friend is already
          waiting for you 🐾💕
        </p>
        <Link to="/" className="home-button">
          <button className="home-button">Back to Home</button>
        </Link>
      </div>

      <img src="/thankYou.png" alt="Thank You" className="thank-you-image" />
    </div>
  );
}
