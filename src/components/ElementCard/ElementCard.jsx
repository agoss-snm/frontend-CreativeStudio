import { Link } from "react-router-dom";
import '../../pages/ElementsPage/ElementsPage.css'

function ElementCard( { title, code, _id }){
    return(
        <div> 
            <div className="ProjectCard card">
                Helloo
        <Link to={`/elements/${_id}`}>
          <h3>{title}</h3>
        </Link>
        <p style={{ maxWidth: "400px" }}>{code} </p>
      </div>

        </div>
    )
}

export default ElementCard;