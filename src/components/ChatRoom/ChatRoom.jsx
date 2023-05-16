import { firestore } from '../../library/init-firebase';
// import firebase from 'firebase/app';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { query, where,collection,serverTimestamp, addDoc, orderBy, limit} from "firebase/firestore"; 
import './ChatRoom.scss';
import PropTypes from "prop-types";
ChatRoom.propTypes = {
  userId:PropTypes.string,
  receiverIds:PropTypes.array,
  isRequest:PropTypes.bool
};
import Commission from '../CommissionBoard/Commission/Commission';
import ChatMessage from './ChatMessage';
import send_icon from '../../assets/icons/send.jpg';
import { useState } from 'react';
import NoContents from '../NoContents/NoContents';
export default function ChatRoom({userId, receiverIds, isRequest}) {
        const rid = sessionStorage.getItem('receiverId');//USE STATE LATER
        const messagesRef = collection(firestore,'messages');
        const receiverIdArray = receiverIds;
        const [RId, setRid] = useState(rid);
        const q = query(messagesRef,where("senderId","in",[userId,RId]),where("receiverId","in",[userId,RId]),orderBy("createdAt","asc"),limit(35));
        const [messages] = useCollectionData(q, {idField:'id'});
        const [formValue, setFormValue] = useState('');
        const commission = JSON.parse(sessionStorage.getItem('commission'));
        const sendMessage = async(e) => {
            e.preventDefault();
            await addDoc(messagesRef,{
                text:formValue,
                createdAt:serverTimestamp(),
                senderId:userId,
                receiverId:RId
            })
            setFormValue('');
        }
    return (
        <div className = "chatRoom">
            <div className = "chatRoom__chatRoomContainer">

                <div className = "chatRoom__chatRoomContainer__select">
                    {receiverIdArray&&((isRequest=="true"&&receiverIdArray)?(receiverIdArray.map((receiverId,index) => (<div key ={index} className = {RId == receiverId? "selectUsers--display":"selectUsers"} onClick = {()=>setRid(receiverId)}> Helper{index}</div>))):(<div className = "selectUsers--display"> Client </div>))}
                </div>
                <div className = "chatRoomSubCon">
                
                <div className = "chatRoom__chatRoomContainer__commission">
                    {commission?(<Commission commission = {commission}/>):(<div> {"Please select a commission from YOUR COMMISSION Page ->"} <Link to='/user_commissions'>Commissions</Link></div>)}
                </div>
                <div className = "chatRoomSubCon__details">
                {RId?
                (<div className="chatRoom__chatRoomContainer__window">
                    Chat with user: {RId} 
                </div>):<NoContents message = "No Helpers Yet to Contact..." submessage = "Maybe come back later...?" pageNum = {3}/>}
                
                {RId&&(
                <div>
                    <div className ="chatRoom__chatRoomContainer__messages">
                        {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg} />)}
                    </div>
                    <form className = "chatRoom__chatRoomContainer__input" onSubmit = {sendMessage}>
                        <input className ="chatRoom__chatRoomContainer__input--input long_input" value = {formValue} placeholder ="Type Message Here..." onChange = {(e) => setFormValue(e.target.value)}/>
                        <button className = "sendContainer" type = "submit"><img className = "send_icon" src={send_icon}/></button>
                    </form>
                </div>)}
                </div>
                </div>
            </div>
        </div>
    )
}

