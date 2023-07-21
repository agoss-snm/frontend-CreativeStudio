import { useState } from "react";
import axios from "axios";
import './AddElement.css'
const API_URL = "http://localhost:5005";


function AddElement() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, code };

    axios
      .post(`${API_URL}/api/elements`, requestBody)
      .then((response) => {
        setTitle("");
        setCode('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='containerForm'>
      <div className='align'>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Code:</label>
          <textarea
            type="text"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddElement;