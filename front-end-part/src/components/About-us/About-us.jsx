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
              At Littlest Pet Shop, we believe that every pet deserves a loving
              home. Our mission is to connect adorable pets in need with caring
              families, making the adoption process simple, safe, and rewarding.
              Whether you're looking for a playful puppy, a cuddly kitten, or a
              small furry friend, we provide a welcoming space where animals
              find their perfect match. With a deep commitment to pet welfare,
              we ensure that each pet is given the love, care, and medical
              attention they need before finding their forever home.
            </p>
          </div>
        </div>
        <div className="section">
          <img src="/cat pet.webp" />
          <div className="text-box">
            <h3>ABOUT</h3>
            <h1>Littles Pet Shop</h1>
            <p>
              Beyond adoptions, Littlest Pet Shop is dedicated to educating
              future pet owners on responsible pet care. We provide valuable
              resources, expert advice, and ongoing support to ensure a smooth
              transition for both pets and their new families. Our team works
              closely with local shelters and rescue organizations, helping
              abandoned and surrendered animals get a second chance at
              happiness. By choosing adoption, you’re not just getting a
              pet—you’re giving an animal the life it deserves.
            </p>
          </div>
        </div>
        <div className="section">
          <img src="/bunny pet.jpg" />
          <div className="text-box">
            <h3>ABOUT</h3>
            <h1>Littles Pet Shop</h1>

            <p>
              Join us in making a difference! Whether you're ready to adopt,
              foster, or support our cause, every effort helps create a better
              future for these lovable companions. At Littlest Pet Shop, we
              believe in building a community that celebrates the joy and
              unconditional love that pets bring into our lives. Together, we
              can give every pet a home filled with warmth, care, and endless
              affection.
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
