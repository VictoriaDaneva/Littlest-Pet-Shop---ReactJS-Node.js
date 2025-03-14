import { Link } from "react-router";
import "./404.css";

export default function ErrorPage() {
  return (
    <div className="error-container">
      <h1 className="error-title">404</h1>
      <p className="error-text">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="error-text-small">
        But don’t worry, you can find your way back to the furry friends!
      </p>
      <Link to="/" className="home-button-err">
        Go Back to Home
      </Link>
    </div>
  );
}
