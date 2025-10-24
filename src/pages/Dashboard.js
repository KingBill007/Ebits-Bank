import '../styles/dashboard.css';
import Card from '../components/Card';
import data from '../data/Data';
import { useState } from 'react';
import Header from '../components/Header';


function Dashboard () {

    const [selectVal, setselectVal] = useState('All')
    
    return (
        <div className='screen'>
            <Header />
            <div className='content'>
                <div className='topContent'>
                    <Card type="Current" amount="$12,450.39" account="Account ****7890" />
                    <Card type="Savings" amount="$28,987.20" account="Account ****7890" />
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
        </div>
    )
}   
export default Dashboard