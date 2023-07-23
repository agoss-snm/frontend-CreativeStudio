import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateIa.css";
import Spinner from "../../components/Spinner/Spinner";
import { AuthContext } from '../../context/auth.context'

const API_URL = "https://creativestudio3.fly.dev/api/chat";

function CreateIa({ isDarkMode }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const iframeRef = useRef(null);
  const [title, setTitle] = useState("");
  const { user, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();

    const prefixedPrompt = `Devuélveme solo en codigo HTML y CSS: ${prompt}`;

    setIsLoading(true);

    axios
      .post(API_URL, { prompt: prefixedPrompt })
      .then((res) => {
        const { response } = res.data;
        setResponse(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSave = () => {
    if (response) {
      setIsSaving(true);

      axios
      .post(
        "https://creativestudio3.fly.dev/api/elements",
        { title, code: response, userId: user._id }, // Pasar userId directamente en el cuerpo de la solicitud
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/elements");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
    
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await authenticateUser();
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (response) {
      const iframeDocument = iframeRef.current.contentDocument;
      iframeDocument.open();
      iframeDocument.write(response);
      iframeDocument.close();
    }
  }, [response]);

  if (!user) {
    return null; // Mostrar un estado de carga o redirigir a la página de inicio de sesión mientras se completa la autenticación
  }


  return (
    <div className="containerCreation">
      <div className="center">
        <h1 className="title">&lt;/&gt;Design and Code by AI</h1>
      </div>

      <div className="">
        <div className="containerB">
          <form onSubmit={handleSubmit} id="formAI">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="titleForm"
              placeholder="Title"
            />
            <div className='center'>
              <label className='becreative'>Be creative 	&#10549;</label>
            </div>
            <div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                id="inputForm"
              />
              <button type="submit" id="buttonSendCreateAI">
                Go!
              </button>
            </div>
          </form>
        </div>
        <div className="grid">
          <div>
            <div className="flex">
              {isLoading ? (
                <Spinner />
              ) : (
                <p>{response}</p>
              )}
            </div>
          </div>
          <div className="row padd">
            <label htmlFor="result" className="form-label"></label>
            <div className="result-container">
              <iframe
                ref={iframeRef}
                title="Result"
                sandbox="allow-same-origin allow-scripts"
                className={isDarkMode ? "dark-mode" : ""}
              ></iframe>
            </div>
            <button onClick={handleSave} disabled={!response || isSaving}>
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateIa;
