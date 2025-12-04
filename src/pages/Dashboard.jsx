import '../styles/main.css';
import Card from '../components/Card';
import data from '../data/Data';
import { useState , useEffect , useRef } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import Cookies from 'js-cookie';
import {URL} from '../data/URL';
import Modal from 'react-modal';
import styles from '../styles/dashboard.module.css';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function Dashboard () {

    const [method, setmethod] = useState('');
    const [totalBal, settotalBal] = useState(202.20);
    const [depAmount, setdepAmount] = useState(0);
    const [activeAccNo, setactiveaccNo] = useState();
    const modalType = useRef('');
    const [activeType, setactiveType] = useState('');
    const [createType, setcreatType] = useState('Current');
    const [depOpen,setdepOpen] = useState(false)
    const [createOpen,setcreateOpen] = useState(false)
    const [hasAccount, sethasAccount] = useState(false)
    const userId = Cookies.get('userId');
    const [selectVal, setselectVal] = useState('All')
    const [info, setInfo] = useState();

    const navigate = useNavigate();
    const navigateTo = (location) =>{
        navigate('/'+location);
    }
    //Check if userId has accounts and save accounts
    const checkAccounts = async () =>{
        try{
            //check if userId exist as cookie
            if (!userId){
                navigateTo('');
                return;
            }
            //get user accounts
            const response = await axios.get(`${URL.baseURL}${URL.API_URL}/accounts/checkAcc/${userId}`);
            if (response.data && response.data.length > 0){
                sethasAccount(true)
                setInfo(response.data)
                //console.log(response.data)
            }else{
                sethasAccount(false);
                setInfo([])
            }
            //filter the sum of user accounts
            const totalValue = response.data.filter(acc => acc.userId._id === userId).reduce((sum, acc) => sum + acc.Value, 0);
            settotalBal(totalValue)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        checkAccounts()
    },[])

    //Opens Available Modals
    const openModal = async (method,type,modalName,accNo)=>{
        modalType.current = type;
        setactiveType(modalType.current);
        setmethod(method);
        setactiveaccNo(accNo)
        if ( modalName === 'depositModal' ){setdepOpen(true);}
        if ( modalName === 'createAccountModal' ){setcreateOpen(true);}
    }

    //deposit / withdraw
    const depositFunc = async ()=>{
        let Amount = 0
        if (method === 'Deposit'){
            Amount = depAmount;
        } else if(method === 'Withdraw'){
            Amount = -depAmount;
        }
        try{
            const response = await axios.post(`${URL.baseURL}${URL.API_URL}/accounts/deposit`,{
                accNumber: activeAccNo,
                accType: activeType,
                amount: Amount
            });
            console.log(response.data)
            checkAccounts()
            setdepOpen(false);
        }catch(err){
            console.log(err)
        }
    }

    //Create an account in the database
    const createAccount = async ()=>{
        try{
            const response = await axios.post(
                `${URL.baseURL}${URL.API_URL}/accounts/create`,
                {
                    type: createType,
                    userId: userId
                }
            );
            console.log(createType)
            checkAccounts();
            setcreateOpen(false)
            console.log('response: ',response)
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div className='screen'>
            <Header total={totalBal}/>
            <div className='content'>
                <div className='topContent'>
                    { hasAccount ? 
                        (
                            info.map((item,index)=>
                                <>
                                    <Card key={index}
                                        type={item.accType} 
                                        amount={item.Value} 
                                        account={item.accNumber} 
                                        func={openModal}    
                                    />
                                    {info.length < 2 ?
                                        <button onClick={()=>{setcreateOpen(true)}} style={{width:'10%',height:100}} ><FaPlus size={50} color='rgba(63, 63, 64, 0.46)' /></button> :
                                        <></>
                                    }
                                </>
                            )
                        )
                        :
                        (<div className={styles.noAccDiv}>
                            <p>You Have No Accounts.</p>
                            <button style={{height:40}} onClick={()=>{openModal(null,null,'createAccountModal')}}>Create Account</button>
                        </div>)
                    }    
                </div>
                <div className='bottomContent'>
                    <div className='upperBttm'>
                        <text style={{fontSize:19, fontWeight:'bold'}}>Transaction History</text>
                        <select value={selectVal} onChange={(val)=>setselectVal(val.target.value)}>
                            <option value="All">All Accounts</option>
                            <option value="Current">Current Account</option>
                            <option value="Savings">Savings Account</option>
                        </select>
                    </div>
                    <div className='lowerBttm'>
                        <table>
                            <thead>
                                <tr>
                                    <th>date</th>
                                    <th>description</th>
                                    <th>account</th>
                                    <th>ammount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.filter(item => selectVal==='All' || item.account=== selectVal).map((info)=>
                                <tr>
                                    <td>{info.date}</td>
                                    <td>{info.description}</td>
                                    <td style={{color:'rgba(0, 72, 255, 1)'}}>{info.account}</td>
                                    <td>{info.amount}</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

                <Modal //modal for deposit
                    name="depositModal"
                    isOpen={depOpen} 
                    onRequestClose={() => setdepOpen(false)} 
                    className={styles.modalContent} 
                    overlayClassName={styles.modalOverlay} 
                >
                        <h2>{activeType} Account</h2>
                        <input type='number' placeholder='Gh₵' onChange={(val)=>setdepAmount(Number(val.target.value))}></input>
                        <button onClick={depositFunc}>{method}</button>
                </Modal>
                <Modal //modal for create account
                    name="createAccountModal"
                    isOpen={createOpen} 
                    onRequestClose={() => setcreateOpen(false)} 
                    className={styles.modalContent} 
                    overlayClassName={styles.modalOverlay} 
                >
                        <h2>Create Account</h2>
                        <div style={{display:'flex',width:'100%',justifyContent:'space-around'}}>
                            <select value={createType} onChange={(val)=>setcreatType(val.target.value)}>
                                <option value="Current">Current Account</option>
                                <option value="Savings">Savings Account</option>
                            </select>   
                            <button onClick={createAccount}>Create account</button>
                        </div>
                </Modal>
        </div>
    )
}   
export default Dashboard