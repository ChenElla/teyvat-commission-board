import './Commission.scss';
import PropTypes from "prop-types";
import loc_icon from "../../../assets/icons/location.png";
import time_icon from "../../../assets/icons/time.png";
import req_icon from "../../../assets/icons/requirement.png";
import { dateConvert } from '../DateConvertFunction';
import axios from 'axios';
import { BACKEND_URL } from '../../../utils/backend';
RequestedCommission.propTypes = {
  commission: PropTypes.object,
  isRequest:PropTypes.bool,
  setHistoryRequests:PropTypes.func,
  historyRequests:PropTypes.array,
  completedRequests:PropTypes.array,
  setCompletedRequests:PropTypes.func
};
import { useNavigate } from 'react-router-dom';
export default function RequestedCommission({commission,isRequest,setCompletedRequests, completedRequests, setHistoryRequests, historyRequests}) {
    let duration = "0 ~ 20mins"
    //0~20mins, 20min~40mins, 40mins~60mins, >1hr, all
    //0, 1, 2, 3, 4
    const navigate = useNavigate();
    const closeCommission = () =>{
        const text = "Are you sure you want to close this commission? - after closing a commission your post will not shown in public and it will no longer accept helpers.(The commission will still be shown in YOUR COMMISSIONS page)";
        if(confirm(text)){
            axios.put(`${BACKEND_URL}/commissions/${commission.id}`,{isAvailable:false});
            const newCom = commission;
            newCom.data.isAvailable=false;
            const newHisReqs = historyRequests;
            newHisReqs.forEach(r => {if(r.id == commission.id) r.data.isAvailable = false;});
            setHistoryRequests(newHisReqs);
            const newComReqs = completedRequests;
            newComReqs.push(newCom);
            setCompletedRequests(newComReqs);
        }
        else{
            return;
        }
    }
    const completeCommission = () =>{
        const text = "Confirmation: do you agree to claim that this commission is completed?(The commission will be listed in your HISTORY only)";
        if(confirm(text)){
            axios.put(`${BACKEND_URL}/commissions/${commission.id}`,{isClosed:true, isCompleted:true})
            const newCom = commission;
            newCom.data.isClosed=true;
            const newHisReqs = historyRequests;
            newHisReqs.forEach(r => {if(r.id == commission.id) r.data.isClosed = true;});
            setHistoryRequests(newHisReqs);
            const newComReqs = completedRequests;
            newComReqs.push(newCom);
            setCompletedRequests(newComReqs);
        }
        else{
            return;
        }
    }
    const handleButton = () => {
        if(commission.data.isAvailable){
            if(isRequest){
                sessionStorage.setItem('receiverIds',JSON.stringify(commission.data.helperId?commission.data.helperId:''));
                sessionStorage.setItem("receiverId",commission.data.helperId?commission.data.helperId[0]:'');
                sessionStorage.setItem('isRequest',true);
                sessionStorage.setItem("commission",JSON.stringify(commission) );
                navigate('/chat_room');//array of helperIds
            }
            else{
                sessionStorage.setItem("receiverId",commission.data.userId);
                const array = [];
                array.push(commission.data.userId)
                sessionStorage.setItem("receiverIds",JSON.stringify(array));
                sessionStorage.setItem('isRequest',false);
                sessionStorage.setItem("commission",JSON.stringify(commission) );
                navigate('/chat_room');
            }
        }
    }
    switch(commission.data.duration){
        case "0":
            duration = "0 ~ 20mins";
            break;
        case "1":
            duration = "20 ~ 40mins";
            break;
        case "2":
            duration = "40 ~ 60mins";
            break;
        case "3":
            duration = ">= 1hr";
            break;
        default:
            duration = "N/A";
    }
  return (
    <div className = "commission" id ={commission.id}>
            <div className = "commission__commissionContent__header">
                <div className = "commission__commissionContent__header__number">
                    {commission.data.helperId?commission.data.helperId.length:0}/{commission.data.requiredPlayerNumber}  
                </div>
                <div className = "commission__commissionContent__header__username">
                    <span className ="underline_black">{commission.data.username}</span> - {commission.data.server} 
                </div>
                <div className = "commission__commissionContent__header__date">
                    {dateConvert(commission.data.timestamp)}
                </div>
            </div>
            <div className = "commission__commissionContent__title">
                <span className =  "commission__commissionContent__title--category">[{commission.data.category}]</span><br id ="title_br"/>
                <span className = "commission__commissionContent__title--details">{commission.data.details}</span>
            </div>
            <div className = "commission__commissionContent__details">
                <img className = "commission__commissionContent__details__icon" src = {loc_icon} alt="requirement_icon"/>
                <div className = "commission__commissionContent__details__text">
                    {commission.data.location} 
                </div>
                <img className = "commission__commissionContent__details__icon" src = {time_icon} alt="time_icon"/>
                <div className = "commission__commissionContent__details__text">
                    {duration}
                </div>
                <img className = "commission__commissionContent__requirement__icon" src = {req_icon} alt="requirement_icon"/>
                <div className = "commission__commissionContent__requirement__text">
                    AR <span className = "smaller">{">="} </span>{commission.data.ar}, WL <span className = "smaller">{">="}</span> {commission.data.wl}
                </div>
            </div>
            
            <div className = "commission__commissionContent__buttons">
                {(isRequest&&commission.data.isAvailable)&&(
                <div className = "commission__commissionContent__buttons__close" onClick = {closeCommission}>
                    CLOSE
                </div>)}
                {(commission.data.isClosed)&&(
                    <div className = "commission__commissionContent__closed">
                        Completed
                    </div>
                )}
                {(isRequest&&!commission.data.isAvailable&&!commission.data.isClosed)&&(
                    <div className = "commission__commissionContent__buttons__complete" onClick = {completeCommission}>
                        Complete
                    </div>
                )}
                <div className = "commission__commissionContent__buttons__contact" onClick ={handleButton}>
                    {!isRequest?("Contact Client"):("Contact Helpers")}
                </div>
            </div>
    </div>
  )
}
