import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { gsap } from "gsap"; // Importar gsap
import './ElementsPage.css';

const API_URL = "http://localhost:5005";

function ElementsPage() {
  const [elements, setElements] = useState([]);
  const titleRef = useRef(null); // Crear una referencia al título

  const getAllElements = () => {
    axios
      .get(`${API_URL}/api/elements`)
      .then((response) => setElements(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllElements();

    // Aplicar el efecto a la carga inicial
    gsap.from(titleRef.current, { opacity: 0, duration: 1, y: -20 });
  }, []);

  function getRandomBackground() {
    return `random-bg-${Math.floor(Math.random() * 3) + 1}`;
  }

  return (
    <div className="containerForm">
      <div className="container overflow-hidden">
        <h1 className="title" ref={titleRef}>AI-powered strategy creation</h1>
        <div className="row">
          {elements.map((element) => (
            <div className="col-md-5 m-1 elementsP" key={element._id} >
              <Link to={`/elements/${element._id}`}>
                <h5 className={`card-title backg titleAdapt ${getRandomBackground()}`}>{element.title.toUpperCase()}</h5>
              </Link>
              <div className="card">
                <div className={`card-body recover ${getRandomBackground()}`}>
                  <style scoped>{element.css}</style>
                  <div dangerouslySetInnerHTML={{ __html: element.code }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ElementsPage;
