import React from "react";
import "./home.scss";

const Home: React.FC = () => {
  return (
    <div className="scrollable-page">
      <section className="section video-section">
        <video autoPlay muted loop className="video">
          <source src="/images/chefcooking.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <a href="/booking" className="booking-overlay">
          <div className="booking-content">
            <h1>Restaurangens Namn</h1>
            <p>Boka Bord</p>
          </div>
        </a>
      </section>
      <section className="section image-section sticky-section">
        <img src="/images/dumpling1.jpg" alt="Image 1" className="image" />
      </section>

      <section className="section text-section scrollable-section">
        <h1 className="title">Välkommen till vår restaurang</h1>
        <h2 className="subtitle">Upptäck våra specialiteter</h2>
        <div className="text-container">
          <div className="text-item">
            <h3 className="item-title">Dumplings</h3>
            <p className="item-text">
              Hemgjorda dumplings fyllda med saftig kyckling och grönsaker.
            </p>
          </div>
          <div className="text-item">
            <h3 className="item-title">Ramen</h3>
            <p className="item-text">
              Traditionell japansk ramen med rik buljong och färska
              ingredienser.
            </p>
          </div>
          <div className="text-item">
            <h3 className="item-title">Sushi</h3>
            <p className="item-text">
              Färsk sushi tillagad av våra erfarna sushikockar.
            </p>
          </div>
        </div>
      </section>
      <section className="section image-section-double">
        <a href="/contact" className="image-link">
          <img src="/images/dumpling2.jpg" alt="Image 3" className="image" />
          <div className="overlay-text">Kontakta oss</div>
        </a>
        <a href="/booking" className="image-link">
          <img src="/images/ramen2.jpg" alt="Image 4" className="image" />
          <div className="overlay-text">Boka Bord</div>
        </a>
      </section>
      <section className="section image-section">
        <img src="/images/ramen1.jpg" alt="Image 2" className="image" />
      </section>
    </div>
  );
};

export default Home;
