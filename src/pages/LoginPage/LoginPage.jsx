import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { Icon } from '@iconify/react';
import eyeOffLine from '@iconify-icons/ri/eye-off-line';
import eyeLine from '@iconify-icons/ri/eye-line';
import "./LoginPage.css";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='containerForm'>
      <div className="LoginPage">
        
        <div className='flex'>
          <form onSubmit={handleLoginSubmit}>
            <div className="inputGroup inputGroup1">
              <input type="email" name="email" id="loginEmail" maxLength="254" value={email} onChange={handleEmail} placeholder="Email"/>
            </div>

            <div className="inputGroup inputGroup2">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={handlePassword}
                  id="password"
                  className={showPassword ? 'input__field show-password' : 'input__field'}
                  placeholder="Password"
                />
                <span className='input__icon__wrapper1'>
                  <Icon icon={showPassword ? eyeLine : eyeOffLine} onClick={handleShowPassword} />
                </span>
            
            </div>
            <div className="inputGroup inputGroup3">
              <button type="submit" id="login">Login</button>
            </div>
          </form>
        </div>

        <div className='flex'>
          <div className='bottomPageLogin'>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p className='darkp'>Don't have an account yet?</p>
            <Link to={"/signup"}><p className='bluep'>Sign Up</p></Link>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default LoginPage;
