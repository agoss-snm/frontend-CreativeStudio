import "./Navbar.css";
import '../../pages/HomePage/HomePage.css'
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
//bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Navbarr({ theme, setTheme }) {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    
    // Verificar si el modo oscuro está activo antes de cambiarlo
    const isDarkModeActive = document.documentElement.classList.contains('dark');
    
    if (isDarkModeActive) {
      // Si el modo oscuro está activo, mantenerlo activo
      setTheme('dark');
      setDarkMode(true);
    } else {
      setTheme(newTheme);
      setDarkMode(!darkMode);
    }
  };
  return (
    <>
    <Navbar expand={false} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="/">Creative AI Studio</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand"
          aria-labelledby="offcanvasNavbarLabel-expand"
          placement="end"
        >
           
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          
          <Offcanvas.Body>
            <ul>
            <Form.Check
          type="switch"
          id="darkModeSwitch"
          label="Dark Mode"
          checked={darkMode}
          onChange={toggleTheme}
        />
              <li className='black'>
                <Link to="/"><p>Home</p></Link>
              </li>
              <li className='black'>
                <Link to="/elements"><p>Discover</p></Link>
              </li>
              <li className='black'>
                <Link to="/createwithia"><p>Create</p></Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li>
                    <button onClick={logOutUser} id='logoutB'>Logout</button>
                  </li>
                  <li>
                    <Link className='black' to="/profile" id='profileB'>Profile</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className='black' to="/signup">Sign Up</Link>
                  </li>
                  <li>
                    <Link  className='black' to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
</>
  );
}

export default Navbarr;
