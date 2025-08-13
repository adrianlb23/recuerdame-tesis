import { useEffect } from "react";
import "../styles/Promociones.css";
import "../styles/index.css";

export default function Promociones() {
  useEffect(() => {
    // Función para cargar el script de Instagram
    const loadInstagramScript = () => {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      loadInstagramScript();
    }
  }, []);

  return (
    <>
      <section>
        <div className="instagram-posts">
          <h1 className="modern-title">Últimas Publicaciones</h1>
          <div className="posts">
            <blockquote
              className="instagram-media"
              data-instgrm-captioned=""
              data-instgrm-permalink="https://www.instagram.com/reel/DHuZ8pmi5Hx/?utm_source=ig_embed&utm_campaign=loading"
              data-instgrm-version={14}
            ></blockquote>
            <blockquote
              className="instagram-media"
              data-instgrm-captioned=""
              data-instgrm-permalink="https://www.instagram.com/p/DLXwLEyRuJX/?utm_source=ig_embed&utm_campaign=loading"
              data-instgrm-version={14}
            ></blockquote>
            <blockquote
              className="instagram-media"
              data-instgrm-captioned=""
              data-instgrm-permalink="https://www.instagram.com/p/DM0ULuMRGjp/?utm_source=ig_embed&utm_campaign=loading"
              data-instgrm-version={14}
            ></blockquote>
          </div>
        </div>
      </section>
    </>
  );
}