import './NoContents.scss';
import error_icon from "../../assets/icons/no_contents.png";
import shocked_icon from '../../assets/icons/shocked.webp';
import rest_icon from '../../assets/icons/rest.png';
import PropTypes from "prop-types";
NoContents.propTypes = {
  message: PropTypes.string,
  submessage:PropTypes.string,
  iconNum:PropTypes.number
};
export default function NoContents({message, submessage,iconNum}) {
  return (

    <div className = "errorContainer">
        <img className = "errorContainer__noContents" src={(iconNum == 1?error_icon:(iconNum==2?shocked_icon:rest_icon))} alt = "no_contents_icon"/>
            
        <div className ="errorContainer__message">
            {message}
        </div>
        <div className ="errorContainer__submessage">
            {submessage}
        </div>
    </div>
  )
}
