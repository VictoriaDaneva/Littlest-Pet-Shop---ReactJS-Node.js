import "./About-us.css";

export default function About() {
  return (
    <>
      <div className="about-us">
        <div className="section">
          <img src="/doggy pet.avif" />
          <div className="text-box">
            <h3>ABOUT</h3>
            <h1>Littles Pet Shop</h1>
            <p>
              At Chamberlain Coffee, we’re passionate about providing
              high-quality, delicious beverages. So you can enjoy every sip,
              slurp, and spill (it happens) with the knowledge that what you’re
              drinking isn’t just delicious, but also thoughtfully made.
            </p>
            <p>
              We are grateful to be a part of your daily routine, and we take it
              seriously. We believe that drinks can be more than just drinks,
              but sources of joy, inspiration, and creativity in a cup.
            </p>
          </div>
        </div>
        <div className="section">
          <img src="/cat pet.webp" />
          <div className="text-box">
            <h3>ABOUT</h3>
            <h1>Chamberlain Coffee</h1>
            <p>
              At Chamberlain Coffee, we’re passionate about providing
              high-quality, delicious beverages. So you can enjoy every sip,
              slurp, and spill (it happens) with the knowledge that what you’re
              drinking isn’t just delicious, but also thoughtfully made.
            </p>
            <p>
              We are grateful to be a part of your daily routine, and we take it
              seriously. We believe that drinks can be more than just drinks,
              but sources of joy, inspiration, and creativity in a cup.
            </p>
          </div>
        </div>
        <div className="section">
          <img src="/bunny pet.jpg" />
          <div className="text-box">
            <h3>ABOUT</h3>
            <h1>Chamberlain Coffee</h1>
            <p>
              At Chamberlain Coffee, we’re passionate about providing
              high-quality, delicious beverages. So you can enjoy every sip,
              slurp, and spill (it happens) with the knowledge that what you’re
              drinking isn’t just delicious, but also thoughtfully made.
            </p>
            <p>
              We are grateful to be a part of your daily routine, and we take it
              seriously. We believe that drinks can be more than just drinks,
              but sources of joy, inspiration, and creativity in a cup.
            </p>
          </div>
        </div>
      </div>
      <div className="map-container">
        <h3>Find Us Here</h3>
        <div className="map-card">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508616!2d144.95373531590425!3d-37.816279742021204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5775d3a63d9c5e1!2sCoffee%20Shop!5e0!3m2!1sen!2sus!4v1690123456789!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}
