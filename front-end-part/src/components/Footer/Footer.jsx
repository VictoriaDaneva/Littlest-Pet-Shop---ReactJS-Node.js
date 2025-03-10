import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img
          src="/footer.png"
          alt="Coffee Shop Logo"
          className="footer-image"
        />
      </div>
      <div className="footer-right">
        <div className="footer-menu">
          <div className="footer-column">
            <h3>Help</h3>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Customer Service</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contacts</h3>
            <ul>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Store Locator</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Social Media</h3>
            <ul>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Ways to Pay</h3>
            <ul>
              <li>
                <a href="#">Credit Cards</a>
              </li>
              <li>
                <a href="#">PayPal</a>
              </li>
              <li>
                <a href="#">Gift Cards</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Littles Pet Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
