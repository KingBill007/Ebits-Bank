import '../styles/main.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import {URL} from '../data/URL';
import Modal from 'react-modal';

function Login() {

  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const navigate = useNavigate();
  const navigateTo = (location) =>{
    navigate('/'+location);
  }

  const [errorOpen, seterrorOpen] = useState(false);
  const [errorMsg,seterrorMsg] = useState('Error');
  const showError = (message)=>{
    seterrorMsg("Error: "+message);
    seterrorOpen(true);
  }

  const check =()=>{
    const userId = Cookies.get('userId');
    if(userId){navigateTo('dashboard')}

    if (errorOpen) {
    const timer = setTimeout(() => {
      seterrorOpen(false);  // this triggers fade-out
    }, 10000); // show for 3 seconds

    return () => clearTimeout(timer);
  }
  }
  useEffect(()=>{
    check()
  },[errorOpen])

  const Login = async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.post(`${URL.baseURL}${URL.API_URL}/users/login`,
        {
          email: email,
          password: password
        })
        console.log(response.data)
        if (response.data.Sucess == false){
          showError(response.data.message)
        } 
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <img src={logo} className="logoImg" alt="logo" />
        <h1>Ebits Bank</h1>
        <p className="subtitle">Sign in to access your account</p>

        <form className="form">
          <label>Email</label>
          <input className="loginInput" type="email" onChange={(val)=>{setemail(val.target.value)}} />

          <label>Password</label>
          <input className="loginInput" type="password" onChange={(val)=>{setpassword(val.target.value)}} />

          <button className="signInBtn" onClick={Login}>Sign In</button>
        </form>

        <span className="forgot">Forgot password?</span>
        <p><span style={{fontSize:13}}>Dont have an account?</span>
        <button className="signUpBtnLight" onClick={()=>navigateTo('signup')}>Sign Up</button>
        </p>
      </div>

        <Modal //modal for ERROR!!!
            name="errorModal"
            isOpen={errorOpen} 
            onRequestClose={() => seterrorOpen(false)} 
            className='errorContent' 
            overlayClassName='errorOverlay'
            closeTimeoutMS={300}   // wait 300ms before unmounting
        >
          {errorMsg}
        </Modal>
    </div>
  );
}
export default Login;
