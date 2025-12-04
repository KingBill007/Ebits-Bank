import { IoMdExit } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Header (props) {

    const navigate = useNavigate();
    const navigateTo = (location) => {
    navigate("/" + location);
    };

    //Logout
    const logoutFunc = ()=>{
        try{
            Cookies.remove('userId');
            Cookies.remove('fName');
            Cookies.remove('lName');
            Cookies.remove('email');
            Cookies.remove('pNumber');
            navigateTo('');
        }catch(err){
            console.log(err)
        }
    }
    return (
            <div className='header'>
                <div className='leftHeader'>
                    <img src={logo} alt='logo' className='logoImg'/>
                    <div className='textHeaderleft'>
                        <span style={{fontSize:20,fontWeight:'bold',fontFamily:'sans-serif'}}>Ebits Bank</span>
                        <span style={{fontFamily:'sans-serif',fontSize:14}}>Online Banking</span>
                    </div>
                </div>

                <div className='rightHeader'>
                    <div className='textHeaderright'>
                        <span style={{fontSize:13,color:'rgba(0, 0, 0, 0.62)'}}>Total Balance</span>
                        <span style={{fontWeight: 'bold',fontSize: 20}}>{props.total.toFixed(2)}</span>
                    </div>
                    <button className='exitBttn' onClick={()=>navigateTo('profile')}><CiUser />John Anderson</button>
                    <button className='exitBttn' onClick={logoutFunc}><IoMdExit color='black' size={20} /></button>  
                </div>
            </div>
    )
}
export default Header;