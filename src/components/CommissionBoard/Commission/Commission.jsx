import './Commission.scss';
import PropTypes from "prop-types";
import loc_icon from "../../../assets/icons/location.png";
import time_icon from "../../../assets/icons/time.png";
import req_icon from "../../../assets/icons/requirement.png";
import { dateConvert } from '../DateConvertFunction';
import axios from 'axios';
import { BACKEND_URL } from '../../../utils/backend';
import { useNavigate } from 'react-router-dom';
Commission.propTypes = {
  commission: PropTypes.object,
  acceptedCom:PropTypes.array,
  setAcceptedCom:PropTypes.func
};
export default function Commission({commission,acceptedCom,setAcceptedCom}) {
    let duration = "0 ~ 20mins"
    const navigate = useNavigate();
    const userId = sessionStorage.getItem("userId");
    const isRequest = userId == commission.data.userId;
    //0~20mins, 20min~40mins, 40mins~60mins, >1hr, all
    //0, 1, 2, 3, 4
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
    const contactHelper= ()=>{
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

    const closeCommission = () =>{
        const text = "Are you sure you want to close this commission? - after closing a commission your post will not shown in public and it will no longer accept helpers.(The commission will still be shown in YOUR COMMISSIONS page)";
        if(confirm(text)){
            axios.put(`${BACKEND_URL}/commissions/${commission.id}`,{isAvailable:false,isClosed:false})
        }
        else{
            return;
        }
    }
    const acceptCommission = ()=>{
        const userId = sessionStorage.getItem("userId");
        axios.put(`${BACKEND_URL}/commissions/${commission.id}/${userId}`,{isAvailable:true}).then((response) => {
            const newArray = acceptedCom;
            newArray.push(userId);
            setAcceptedCom(newArray);
            sessionStorage.setItem('isRequest',false);
            navigate('/user_commissions');
        })
    }
  return (
    <div className = "commission">
        <div className = "commission__commissionContent">
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
            {(isRequest)?(
                <div className = "commission__commissionContent__buttons__close" onClick = {closeCommission}>
                    CLOSE
                </div>):(
                    <div className = "commission__commissionContent__buttons__contact" onClick = {acceptCommission}>
                        Accept
                    </div>
            )}
            <div className = "commission__commissionContent__buttons__contact" onClick = {contactHelper}>
                    Contact {isRequest?"Helpers":"Client"}
            </div>
            </div>
            
        </div>
    </div>
  )
}
