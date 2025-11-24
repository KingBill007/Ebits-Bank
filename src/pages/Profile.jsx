import Header from "../components/Header";
import '../styles/profile.css';
import user from '../assets/user.png';
import { BiUser } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Profile() {
        const navigate = useNavigate();
      const navigateTo = (location) => {
        navigate("/" + location);
      };

    return(
        <div className="screen">
            <Header />
            <div className="profileContent">
                <button className="backBttn"onClick={()=>navigateTo('dashboard')} ><IoArrowBackOutline size={18} style={{marginRight:8}}/>Back to Dashboard</button>
                <div className="info">
                    <div className="pTitle">
                        <img src={user} alt='user' className="userImg"/>
                        <div className="pTitleText">
                            <text style={{fontWeight:'bold',fontSize:20}}>John Anderson</text>
                            <text style={{fontSize:15,color:'#000000a2'}}>Account holder</text>
                        </div>
                    </div> 
                    <div className="pBody">
                        <label><BiUser size={15} style={{marginRight:'5'}} />Full name</label>
                        <input className="pInput" placeholder="John Anderson"></input>

                        <label><MdOutlineEmail size={15} style={{marginRight:'5'}} />Email Address</label>
                        <input className="pInput" placeholder="john.anderson@email.com"></input>

                        <label><FiPhone size={15} style={{marginRight:'5'}} />Phone Number</label>
                        <input className="pInput" placeholder="0568242552"></input>

                        <button className="pUpdate">Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;