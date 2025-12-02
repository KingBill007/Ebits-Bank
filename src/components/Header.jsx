import { IoMdExit } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Header (props) {
        const navigate = useNavigate();
          const navigateTo = (location) => {
            navigate("/" + location);
          };
    return (
            <div className='header'>
                <div className='leftHeader'>
                    <img src={logo} alt='logo' className='logoImg'/>
                    <div className='textHeaderleft'>
                        <text style={{fontSize:20,fontWeight:'bold',fontFamily:'sans-serif'}}>Ebits Bank</text>
                        <text style={{fontFamily:'sans-serif',fontSize:14}}>Online Banking</text>
                    </div>
                </div>

                <div className='rightHeader'>
                    <div className='textHeaderright'>
                        <text style={{fontSize:13,color:'rgba(0, 0, 0, 0.62)'}}>Total Balance</text>
                        <text style={{fontWeight: 'bold',fontSize: 20}}>{props.total.toFixed(2)}</text>
                    </div>
                    <button className='exitBttn' onClick={()=>navigateTo('profile')}><CiUser />John Anderson</button>
                    <button className='exitBttn' onClick={()=>navigateTo('')}><IoMdExit color='black' size={20} /></button>  
                </div>
            </div>
    )
}
export default Header;