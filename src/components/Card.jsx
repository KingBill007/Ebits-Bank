import { CiWallet } from "react-icons/ci";
import { LuPiggyBank } from "react-icons/lu";
function Card (props){
    return (
      <div className="accountCard">
        <div className="accountCardLeft">
          <text style={{ fontWeight: "bold" }}>{props.type} Account</text>
          <text style={{ fontSize: 28, fontWeight: "bold", color:'rgba(1, 45, 156, 1)' }}>{props.amount}</text>
          <text style={{ fontSize: 13 }}>{props.account}</text>
          <button className="blueBttn">{props.type}</button>
        </div>
        <div className="accountCardRight"> 
          {props.type==='Current' ? <CiWallet size={100} color="rgba(62, 117, 255, 0.71)"/> : <LuPiggyBank size={92} color='rgba(62, 117, 255, 0.71)' />}
        </div>
      </div>
    );
}
export default Card