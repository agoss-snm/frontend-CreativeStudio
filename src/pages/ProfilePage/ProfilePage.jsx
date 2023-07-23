import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import gif122 from "../../img/gif122.gif";
import { Link } from "react-router-dom";
import './ProfilePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [creations, setCreations] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        setImageUrl(e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  useEffect(() => {
    axios
      .get(`https://creativestudio3.fly.dev/api/users/${user._id}/favorites`)
      .then((response) => {
        console.log(response);
        setFavorites(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://creativestudio3.fly.dev/api/elements?userId=${user._id}`)
      .then((response) => {
        console.log(response);
        setCreations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Check if there's a previously selected image URL stored in local storage
    const storedImageUrl = localStorage.getItem("selectedImageUrl");
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }
  }, [user]);

  // Update local storage with the selected image URL whenever it changes
  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem("selectedImageUrl", imageUrl);
    }
  }, [imageUrl]);


  return (
    <div id="profileGrid">

      <div className='flexSpace redgwt'>
        <div className='container flexSpace'>
          <h2 className='titleDashboard'>Hi <span id='userName'>{user.name}</span>, this is <span id='orangeY'>(y)our creative studio</span></h2>
        </div>
        <div>
          <form id='formUpload'>
            <div className="input-file">
              <img id="file_upload" src={imageUrl || "http://placehold.it/70"} alt="your image" className="upload-img" />
              <div className="input-file-upload">
                <span className="upload-label"> <FontAwesomeIcon icon={faCamera} id='faiconcamera' /></span>
                <input type="file" onChange={(e) => readURL(e.target)} />
              </div>
            </div>
          </form>
        </div>
      </div>


      <div className='container gr tarara'>

        <div>
        <container>
          <card>
            <h2 className='card-title padcard2'>Favorites</h2>
            <div className="row p-1">
              {favorites.map((favorite) => (
                <div key={favorite._id} >
                  <div >
                    <div className="card-body">
                      <h6 className="card-title pd2">
                        <Link to={`/elements/${favorite._id}`}>{favorite.title}</Link>
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </card>
        </container>
        </div>
        <div className="hi"></div>

        <div>
          <container >
            <card >
              <h2 className='card-title padcard2'>My Designs:</h2>
              <div className="row p-1">
                {creations.map((creation) => (
                  <div key={creation._id} className="col-md-4">
                    <div className="cardDesigns">
                      <div className="card-body" >
                        <h6 className="card-title">
                          <Link to={`/elements/${creation._id}`}>{creation.title}</Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </card>
          </container>
        </div>
      </div>

      <div>

      </div>

    </div>
  );
}

export default ProfilePage;
