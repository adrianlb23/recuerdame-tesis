import { useEffect, useRef, useState } from "react";
import "../styles/Precios.css";
import "../styles/index.css";

export default function Precios() {
  const [selectedType, setSelectedType] = useState("diseñador");
  const [selectedConcentration, setSelectedConcentration] = useState("normal");

  // Función para manejar el cambio de tipo de perfume
  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  // Función para manejar el cambio de concentración
  const handleConcentrationChange = (concentration) => {
    setSelectedConcentration(concentration);
  };

  // Determinar qué tabla mostrar basado en las selecciones
  const getActiveTableClass = () => {
    return `${selectedType}-${selectedConcentration}`;
  };

  return (
    <>
      <main>
        <h1 className="modern-title">Precios</h1>
        {/* Selector de categoría */}
        <div className="price-selector-container">
          <div className="selector-group">
            <h3>Tipo de Perfume:</h3>
            <div className="button-group">
              <button
                className={`selector-btn ${selectedType === "diseñador" ? "active" : ""}`}
                onClick={() => handleTypeChange("diseñador")}
              >
                Diseñador
              </button>
              <button
                className={`selector-btn ${selectedType === "nicho" ? "active" : ""}`}
                onClick={() => handleTypeChange("nicho")}
              >
                Nicho
              </button>
            </div>
          </div>
          <div className="selector-group">
            <h3>Concentración:</h3>
            <div className="button-group">
              <button
                className={`selector-btn ${selectedConcentration === "normal" ? "active" : ""}`}
                onClick={() => handleConcentrationChange("normal")}
              >
                Normal
              </button>
              <button
                className={`selector-btn ${selectedConcentration === "extracto" ? "active" : ""}`}
                onClick={() => handleConcentrationChange("extracto")}
              >
                Extracto
              </button>
            </div>
          </div>
        </div>
        {/* Contenedor de tablas (ahora individuales) */}
        <div className="main-container-precios">
          <div
            className={`price-table diseñador-normal ${
              getActiveTableClass() === "diseñador-normal" ? "active" : ""
            }`}
          >
            <div className="bg-tittle">
              <h2>Perfumes de diseñador</h2>
              <h3>Concentración normal</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Tamaño</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15ML</td>
                  <td>$3.000</td>
                </tr>
                <tr>
                  <td>30ML</td>
                  <td>$5.000</td>
                </tr>
                <tr>
                  <td>50ML</td>
                  <td>$8.500</td>
                </tr>
                <tr>
                  <td>65ML</td>
                  <td>$9.500</td>
                </tr>
                <tr>
                  <td>100ML</td>
                  <td>$15.000</td>
                </tr>
                <tr>
                  <td>120ML</td>
                  <td>$16.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className={`price-table diseñador-extracto ${
              getActiveTableClass() === "diseñador-extracto" ? "active" : ""
            }`}
          >
            <div className="bg-tittle">
              <h2>Perfumes de diseñador</h2>
              <h3>Concentración extracto</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Tamaño</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15ML</td>
                  <td>$7.000</td>
                </tr>
                <tr>
                  <td>30ML</td>
                  <td>$12.000</td>
                </tr>
                <tr>
                  <td>50ML</td>
                  <td>$18.000</td>
                </tr>
                <tr>
                  <td>65ML</td>
                  <td>$20.000</td>
                </tr>
                <tr>
                  <td>100ML</td>
                  <td>$26.000</td>
                </tr>
                <tr>
                  <td>120ML</td>
                  <td>$28.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className={`price-table nicho-normal ${
              getActiveTableClass() === "nicho-normal" ? "active" : ""
            }`}
          >
            <div className="bg-tittle">
              <h2>Perfumes de nicho</h2>
              <h3>Concentración normal</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Tamaño</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15ML</td>
                  <td>$5.000</td>
                </tr>
                <tr>
                  <td>30ML</td>
                  <td>$8.000</td>
                </tr>
                <tr>
                  <td>50ML</td>
                  <td>$13.000</td>
                </tr>
                <tr>
                  <td>65ML</td>
                  <td>$14.000</td>
                </tr>
                <tr>
                  <td>100ML</td>
                  <td>$23.000</td>
                </tr>
                <tr>
                  <td>120ML</td>
                  <td>$25.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className={`price-table nicho-extracto ${
              getActiveTableClass() === "nicho-extracto" ? "active" : ""
            }`}
          >
            <div className="bg-tittle">
              <h2>Perfumes de nicho</h2>
              <h3>Concentración extracto</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Tamaño</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15ML</td>
                  <td>$12.000</td>
                </tr>
                <tr>
                  <td>30ML</td>
                  <td>$19.000</td>
                </tr>
                <tr>
                  <td>50ML</td>
                  <td>$28.000</td>
                </tr>
                <tr>
                  <td>65ML</td>
                  <td>$30.000</td>
                </tr>
                <tr>
                  <td>100ML</td>
                  <td>$38.000</td>
                </tr>
                <tr>
                  <td>120ML</td>
                  <td>$40.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="envios-container">
          <h2>Envíos</h2>
          <p>
            Enviamos a todo Chile a través de Starken, modalidad "envío por pagar".
          </p>
          <p>
            <b>Compra mínima: $15.000</b>
          </p>
          <button onClick={() => window.location.href = '/'}>Inicio</button>
        </div>
      </main>
    </>
  );
}