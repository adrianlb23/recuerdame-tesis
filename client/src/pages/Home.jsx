import { useEffect, useRef, useState } from "react";
import "../styles/Home.css";
import "../styles/index.css";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef([]);
  const navRef = useRef(null);

  // Carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesRef.current.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  // Menu hamburguesa
  const abrirMenu = () => navRef.current.classList.add("visible");
  const cerrarMenu = () => navRef.current.classList.remove("visible");

  
  
  return (
    <>
      <header className="modern-header">
        <div className="logo-container">
        <img
            className="logo-img"
            src="./assets/logo.png"
            alt="Logo"
            onclick="location.href='/index.html'"
        />
        <h1>Perfumería Recuérdame</h1>
        </div>
        <button id="abrir" className="abrir-menu">
        <i className="fas fa-bars" />
        </button>
        <nav className="nav" id="nav">
        <button className="cerrar-menu" id="cerrar">
            <i className="fas fa-times" />
        </button>
        <ul className="nav-list">
            <li>
            <a href="/catalogos/hombre.html">Masculino</a>
            </li>
            <li>
            <a href="/catalogos/mujer.html">Femenino</a>
            </li>
            <li>
            <a href="/catalogos/nicho.html">Nicho</a>
            </li>
            <li>
            <a href="/precios/precios.html">Precios</a>
            </li>
            <li>
            <a href="/promociones/promociones.html">Novedades</a>
            </li>
        </ul>
        </nav>
    </header>
    <main>
        <section className="hero">
        <div className="carousel">
        {["./assets/img1.jpeg","/assets/img2.jpeg","/assets/img3.jpeg","/assets/img4.jpeg","/assets/img5.jpeg","/assets/img6.jpeg"]
          .map((src, idx) => (
          <div
            key={idx}
            ref={(el) => (slidesRef.current[idx] = el)}
            className={`carousel-slide ${currentSlide === idx ? "active" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
        <div className="overlay" />
        <div className="hero-content">
            <h1>Descubre tu fragancia ideal</h1>
            <p>Explora nuestro universo olfativo y encuentra tu esencia perfecta</p>
            <div className="catalog-cards">
            <a
                href="../catalogos/hombre.html"
                className="catalog-card"
                style={{ backgroundImage: 'url("/img/hombre.jpg")' }}
            >
                <div className="catalog-overlay" />
                <span>Hombre</span>
            </a>
            <a
                href="../catalogos/mujer.html"
                className="catalog-card"
                style={{ backgroundImage: 'url("/img/mujer.jpg")' }}
            >
                <div className="catalog-overlay" />
                <span>Mujer</span>
            </a>
            <a
                href="../catalogos/nicho.html"
                className="catalog-card"
                style={{ backgroundImage: 'url("/img/nicho.jpg")' }}
            >
                <div className="catalog-overlay" />
                <span>Nicho</span>
            </a>
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
            <a href="../catalogos/hombre.html" className="ver-catalogo-btn">
            Ver en catálogo
            </a>
        </div>
        <div className="perfume-card">
            <h3>Good Girl</h3>
            <p className="marca">Carolina Herrera</p>
            <p className="catalogo-numero">Mujer N°61</p>
            <a href="../catalogos/mujer.html" className="ver-catalogo-btn">
            Ver en catálogo
            </a>
        </div>
        <div className="perfume-card">
            <h3>Y. B. Marshmallow</h3>
            <p className="marca">Kayali</p>
            <p className="catalogo-numero">Nicho N°135</p>
            <a href="../catalogos/nicho.html" className="ver-catalogo-btn">
            Ver en catálogo
            </a>
        </div>
        <div className="perfume-card">
            <h3>Althair</h3>
            <p className="marca">Parfums de Marly</p>
            <p className="catalogo-numero">Nicho N°48</p>
            <a href="../catalogos/nicho.html" className="ver-catalogo-btn">
            Ver en catálogo
            </a>
        </div>
        </div>
    </section>
    <section className="about-map-section">
        <div className="content-wrapper">
        <div className="about-us">
            <h2>Sobre Nosotros</h2>
            <p>
            En <b>Recuérdame</b>, transformamos cada fragancia en una experiencia
            única que despierta recuerdos inolvidables. Como perfumería local de
            tradición familiar, llevamos más de 10 años creando aromas de
            inspiración premium, combinando calidad y accesibilidad para
            adaptarnos a cada estilo y personalidad. Nuestro compromiso es ofrecer
            perfumes excepcionales que conviertan momentos cotidianos en
            memorables, reflejando nuestra pasión por la excelencia a precios
            alcanzables. Más que una perfumería, somos parte de tu historia,
            valorando cada cliente, sonrisa y recuerdo como parte de nuestra
            comunidad. Innovamos constantemente mientras mantenemos la cercanía y
            confianza que nos define.
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
            "El domingo fui a su tienda en persa y debo decir que la atención de
            sus trabajadores es super buena, felicidades 🎉❤️"
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
            llevé concentración normal y WOW, lo aplique anoche y hasta ahora me
            dura el aroma en piel y ropa y que decir de la similitud, sin duda
            volveré por más"
            </p>
            <h4>@_yourgirlpilita_</h4>
        </div>
        </div>
    </section>
    <footer className="modern-footer">
        <div className="footer-content">
        <div className="footer-section">
            <h4>Contacto</h4>
            <p>
            <i className="fas fa-phone-alt" /> +56 9 6547 2295
            </p>
            <p>
            <i className="fas fa-envelope" /> perfumesrecuerdame@gmail.com
            </p>
            <p>
            <i className="fas fa-map-marker-alt" /> Persa Víctor Manuel: Galería
            La Curtiembre
            </p>
        </div>
        <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-links">
            <a
                href="https://www.instagram.com/perfumeriarecuerdame/"
                target="_blank"
                aria-label="Instagram"
            >
                <i className="fab fa-instagram" />
            </a>
            </div>
        </div>
        </div>
        <div className="footer-bottom">
        <p>© 2025 Perfumería Recuérdame. Todos los derechos reservados.</p>
        </div>
    </footer>
    </>
  );
}
