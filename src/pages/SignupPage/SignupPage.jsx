import "./SingUp.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Icon } from '@iconify/react';
import eyeOffLine from '@iconify-icons/ri/eye-off-line';
import eyeLine from '@iconify-icons/ri/eye-line';

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
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
      <div className="SignupPage">
        <div className='flex'>
          <form onSubmit={handleSignupSubmit}>
            <div className="inputGroup inputGroup1">
              <input type="email" name="email" value={email} onChange={handleEmail} placeholder="Email" />
            </div>
            <div className="inputGroup inputGroup2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handlePassword}
                id="password"
                value={password}
                className={showPassword ? "input__field show-password" : "input__field"}
                placeholder="Password"
              />
              <span className="input__icon__wrapper">
                <Icon icon={showPassword ? eyeLine : eyeOffLine} onClick={handleShowPassword} />
              </span>
            </div>

            <div className="inputGroup inputGroup3">
              <input type="text" name="name" value={name} onChange={handleName} placeholder="Name" />
              <br />
              <button type="submit" id='signUp'>Sign Up</button>
            </div>
          </form>
        </div>


        <div className='flex'>
          <div className='bottomPageLogin'>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p className='darkp'>Already have account?</p>
            <Link to={"/login"}> <p className='bluep'>Login</p> </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
