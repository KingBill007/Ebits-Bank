import '../styles/main.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const navigateTo = (location) =>{
    navigate('/'+location);
  }
  return (
    <div className="App">
      <div className="container">
        <img src={logo} className="logoImg" alt="logo" />
        <h1>Ebits Bank</h1>
        <p className="subtitle">Sign in to access your account</p>

        <div className="form">
          <label>Email</label>
          <input className="loginInput" type="email" />

          <label>Password</label>
          <input className="loginInput" type="password" />
        </div>

        <p className="forgot">Forgot password?</p>
        <button className="signInBtn" onClick={()=>navigateTo('dashboard')}>Sign In</button>

        <p><span style={{fontSize:13}}>Dont have an account?</span>
        <button className="signUpBtnLight" onClick={()=>navigateTo('signup')}>Sign Up</button>
        </p>
      </div>
    </div>
  );
}
export default Login;
