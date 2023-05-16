import PropTypes from "prop-types";
import ChatRoom from '../../components/ChatRoom/ChatRoom';
import { useState } from "react";
ChatRoomPage.propTypes = {
  userId:PropTypes.string,
  setPageNum:PropTypes.func
};
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ChatRoomPage({userId,setPageNum}) {
    const navigate = useNavigate();
    if(!userId)
        navigate('/login');
    const [receiverIds, setReceiverIds] = useState([]);
    const [isRequest, setIsRequest] = useState(false);
    useEffect(()=>{
        setReceiverIds(JSON.parse(sessionStorage.getItem("receiverIds"))||[]);
        setIsRequest(sessionStorage.getItem('isRequest'));
    },[])
    setPageNum(2);
    // const rid = sessionStorage.getItem('receiverId');
    return (
        <ChatRoom userId = {userId} receiverIds ={receiverIds} isRequest= {isRequest}/>
    )
}
