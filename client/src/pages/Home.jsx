import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import "../styles/index.css";

// Importar las imágenes
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpeg";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef([]);
  const navRef = useRef(null);

  // Solo las primeras 5 imágenes
  const carouselImages = [img1, img2, img3, img4, img5];

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <>
      <main>
        <section className="hero">
          <div className="carousel">
            {carouselImages.map((src, idx) => (
              <div
                key={idx}
                ref={(el) => (slidesRef.current[idx] = el)}
                className={`carousel-slide ${
                  currentSlide === idx ? "active" : ""
                }`}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </div>
          <div className="overlay" />
          <div className="hero-content">
            <h1>Descubre tu fragancia ideal</h1>
            <p>
              Explora nuestro universo olfativo y encuentra tu esencia perfecta
            </p>
            <div className="catalog-cards">
              <Link
                to="/hombre"
                className="catalog-card"
                style={{ backgroundImage: 'url("/img/hombre.jpg")' }}
              >
                <div className="catalog-overlay" />
                <span>Hombre</span>
              </Link>
              <Link
                to="/mujer"
                className="catalog-card"
                style={{ backgroundImage: 'url("/img/mujer.jpg")' }}
              >
                <div className="catalog-overlay" />
                <span>Mujer</span>
              </Link>
              <Link
                to="/nicho"
                className="catalog-card"
                style={{ backgroundImage: 'url("/img/nicho.jpg")' }}
              >
                <div className="catalog-overlay" />
                <span>Nicho</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <section id="top-sellers" className="top-sellers">
        <h2>Top Ventas</h2>

        <div className="contenedor-top-sellers">
          <div className="perfume-card">
            <h3>Scandal Absolu</h3>
            <p className="marca">Jean Paul Gaultier</p>
            <p className="catalogo-numero">Hombre N°81</p>
            <Link to="/hombre" className="ver-catalogo-btn">
              Ver en catálogo
            </Link>
          </div>

          <div className="perfume-card">
            <h3>Good Girl</h3>
            <p className="marca">Carolina Herrera</p>
            <p className="catalogo-numero">Mujer N°61</p>
            <Link to="/mujer" className="ver-catalogo-btn">
              Ver en catálogo
            </Link>
          </div>

          <div className="perfume-card">
            <h3>Y. B. Marshmallow</h3>
            <p className="marca">Kayali</p>
            <p className="catalogo-numero">Nicho N°135</p>
            <Link to="/nicho" className="ver-catalogo-btn">
              Ver en catálogo
            </Link>
          </div>

          <div className="perfume-card">
            <h3>Althair</h3>
            <p className="marca">Parfums de Marly</p>
            <p className="catalogo-numero">Nicho N°48</p>
            <Link to="/nicho" className="ver-catalogo-btn">
              Ver en catálogo
            </Link>
          </div>
        </div>
      </section>

      <section className="about-map-section">
        <div className="content-wrapper">
          <div className="about-us">
            <h2>Sobre Nosotros</h2>
            <p>
              En <b>Recuérdame</b>, transformamos cada fragancia en una
              experiencia única que despierta recuerdos inolvidables. Como
              perfumería local de tradición familiar, llevamos más de 10 años
              creando aromas de inspiración premium, combinando calidad y
              accesibilidad para adaptarnos a cada estilo y personalidad.
              Nuestro compromiso es ofrecer perfumes excepcionales que
              conviertan momentos cotidianos en memorables, reflejando nuestra
              pasión por la excelencia a precios alcanzables. Más que una
              perfumería, somos parte de tu historia, valorando cada cliente,
              sonrisa y recuerdo como parte de nuestra comunidad. Innovamos
              constantemente mientras mantenemos la cercanía y confianza que nos
              define.
            </p>
          </div>
          <div className="map">
            <h2>Ubicación</h2>
            <iframe
              loading="lazy"
              allowFullScreen=""
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=persa%20victor%20manuel%2C%20local%20184%2C%20sector%204&zoom=16&maptype=roadmap"
            ></iframe>
          </div>
        </div>
      </section>
      <section id="testimonios" className="testimonios">
        <h2>Testimonios</h2>
        <div className="contenedor-testimonios">
          <div className="testimonio">
            <p>
              "El domingo fui a su tienda en persa y debo decir que la atención
              de sus trabajadores es super buena, felicidades 🎉❤️"
            </p>
            <h4>@alexcompletoitalianoconmayo</h4>
          </div>
          <div className="testimonio">
            <p>
              "Como siempre, excelente atención y excelente los productos mis
              felicitaciones 👏👏👏👏👏"
            </p>
            <h4>@rolyrmorales</h4>
          </div>
          <div className="testimonio">
            <p>
              "Ayer les compré Milk, de Commodity y aunque no había extracto, me
              llevé concentración normal y WOW, lo aplique anoche y hasta ahora
              me dura el aroma en piel y ropa y que decir de la similitud, sin
              duda volveré por más"
            </p>
            <h4>@_yourgirlpilita_</h4>
          </div>
        </div>
      </section>
    </>
  );
}
