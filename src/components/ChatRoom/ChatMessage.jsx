import paimon_icon from '../../assets/userIcons/paimon_default.png';
import PropTypes from "prop-types";
ChatMessage.propTypes = {
  message:PropTypes.object,
};
export default function ChatMessage(props) {
    const {text,senderId,receiverId} = props.message;
    const messageClass = senderId === sessionStorage.getItem('userId')? 'sent':'received';
  return (
    <div className = {`message--${messageClass}`}>
        {messageClass==="sent"&&(<p className = {`message--${messageClass}__text`}>{text}</p>)}
        <img className = {`message--${messageClass}__icon`} src = {paimon_icon} />
        {messageClass==="received"&&(<p className = {`message--${messageClass}__text`}>{text}</p>)}
    </div>
  )
}
