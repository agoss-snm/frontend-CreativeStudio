// EditPage.js
import './EditPage.css'
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPage() {
  const { id } = useParams();
  const [element, setElement] = useState(null);
  const [editedCode, setEditedCode] = useState("");
  const [renderedCode, setRenderedCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/elements/${id}/edit`)
      .then((response) => {
        setElement(response.data);
        setEditedCode(response.data.code);
        setRenderedCode(response.data.code); // Inicialmente muestra el código sin renderizar
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5005/api/elements/${id}`, { code: editedCode })
      .then((response) => {
        console.log(response.data);
        navigate(`/elements/${id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleCodeChange = (e) => {
    const code = e.target.value;
    setEditedCode(code);

    // Renderizar el código actualizado
    setRenderedCode(code);
  };

  if (!element) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="altura">
      <div className="container">
        <div className="middle">
          <h2 className="subtitle">{element.title}</h2>
        </div>
        <div className="padd2" id='maxW'>
        <div className="rendered-code" id='viewW'>
        <iframe
          title="Rendered Code"
          sandbox="allow-same-origin allow-scripts"
          className="rendered-iframe"
          srcDoc={renderedCode}
          id='renderEdit'
        ></iframe>
      </div>
        </div>
        <div className='padd2'>
        <div>
          <textarea
            value={editedCode}
            onChange={handleCodeChange}
            rows={10}
            cols={120}
          />
        </div>
        </div>
      </div>
      <div className="linksDetail">
        <button className="buttonDetail">
          <Link to={`/elements/${id}`}>Back</Link>
        </button>
        <button className="buttonDetail" onClick={handleUpdate}>
          Save
        </button>
      </div>
    
    </div>
  );
}

export default EditPage;
