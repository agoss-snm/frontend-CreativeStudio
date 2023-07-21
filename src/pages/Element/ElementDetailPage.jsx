import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../Element/Element.css";
import { AuthContext } from "../../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid, faEdit } from "@fortawesome/free-solid-svg-icons";

const ElementDetailPage = () => {
  const { id } = useParams();
  const [element, setElement] = useState(null);
  const [renderedCode, setRenderedCode] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/elements/${id}`)
      .then((response) => {
        setElement(response.data);
        setRenderedCode(response.data.code);
        setIsCurrentUser(response.data.user._id === user._id);
        setIsFavorite(response.data.user.favorites.includes(id));
      })
      .catch((error) => console.log(error));
  }, [id, user]);

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
      axios
        .delete(`http://localhost:5005/api/elements/${id}`)
        .then(() => {
          navigate("/elements");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleAddToFavorites = () => {
    axios
      .post(`http://localhost:5005/api/users/${user._id}/favorites`, { elementId: id })
      .then(() => {
        setIsFavorite(!isFavorite);
      })
      .catch((error) => console.log(error));
  };

  if (!element) {
    return <div>Cargando...</div>;
  }

  const createMarkup = () => {
    return { __html: renderedCode };
  };

  return (
    <div className="altura">
      <div className="container">
        <div className="middle">
          <h2 className="subtitle">{element.title}</h2>
        </div>
        <div className="alignR">
          <p>by <span className="colorY">{element.user.name}</span></p>
        </div>

        <div className="padd2">
          <p>{element.code}</p>
        </div>
        <div className="">
          <div className="rendered-code" dangerouslySetInnerHTML={createMarkup()} />
        </div>
      </div>
      <div className="linksDetail">
        <button className="buttonDetail btnbackk">
          <Link to={"/elements"}>Back</Link>
        </button>
        {isCurrentUser && (
          <>
            <button className="buttonDetail btndelete" onClick={handleDelete}>
              Delete
            </button>
            <button className="buttonDetail btnEdit">
              <Link to={`/elements/${id}/edit`}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Link>
            </button>
          </>
        )}
        <button className="buttonDetail btnHeart" onClick={handleAddToFavorites}>
          {isFavorite ? (
            <FontAwesomeIcon icon={faHeartSolid} color="red" />
          ) : (
            <FontAwesomeIcon icon={faHeart} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ElementDetailPage;

