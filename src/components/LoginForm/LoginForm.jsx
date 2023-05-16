import paimon_icon from "../../assets/userIcons/paimon_default.png";
import error_icon from "../../assets/icons/error.svg";
import { useRef } from "react";
import { BACKEND_URL } from "../../utils/backend";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import axios from 'axios';
import PropTypes from "prop-types";
LoginForm.propTypes = {
  setUserId:PropTypes.func,
  setUserProfile:PropTypes.func,
  userId:PropTypes.string
};
export default function LoginForm({userId,setUserId, setUserProfile}) {
    const navigate = useNavigate();
    const formRef = useRef();
    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        const ref_array = [
            usernameRef,
            passwordRef
        ]
        let empty = false;
		ref_array.forEach((item, index) => {
			if (!item.current.value) {
				item.current.focus();
				empty = true;
				item.current.parentElement.classList.add("focus");
                item.current.parentElement.classList.remove("not_focused");
				document
					.getElementById(`error_message_${index}`)
					.classList.add("errorMessage--display");
                document
                    .getElementById(`error_message_${index}_invalid`)
                    .classList.remove("errorMessage--display");
			} else {
				item.current.parentElement.classList.remove("focus");
                item.current.parentElement.classList.add("not_focused");
				document
					.getElementById(`error_message_${index}`)
					.classList.remove("errorMessage--display");
                document
                    .getElementById(`error_message_${index}_invalid`)
                    .classList.remove("errorMessage--display");
			}
		});
        if(empty) return;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        axios.get(`${BACKEND_URL}/auth/${username}/${password}`).then(response =>{
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("userId",response.data);
            setUserId(response.data);
            axios
            .get(`${BACKEND_URL}/users/${response.data}`)
            .then((resp) => {
              setUserProfile(resp.data);
              sessionStorage.setItem("server",resp.data.data.server);
              navigate('/profile');
            })
            .catch((error) => console.log(error.message));
        }).catch(error => {
                if(error.response.status == "403")
                {
                        passwordRef.current.focus();
                        passwordRef.current.parentElement.classList.add("focus");
                        passwordRef.current.parentElement.classList.remove("not_focused");
                        document
                            .getElementById("error_message_1_invalid")
                            .classList.add("errorMessage--display");
                        return
                } 
                else{
                    usernameRef.current.focus();
                    usernameRef.current.parentElement.classList.add("focus");
                    usernameRef.current.parentElement.classList.remove("not_focused");
                    if(error.response.status == "404")
                        document
                            .getElementById("error_message_0_invalid")
                            .classList.add("errorMessage--display");
                    else
                        document
                        .getElementById("error_message_0")
                        .classList.add("errorMessage--display");
                    return
                }
            }       
        );
    }
  return (
  <>
    <link rel = "stylesheet" 
          href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <div className = "container loginFormContainer">
    <div className="loginContainer">
      <div className="loginContainer__title">Welcome</div>
      <img
        className="loginContainer__icon"
        src={paimon_icon}
        alt="default_icon"
      />
      <form className="loginContainer__loginForm" ref= {formRef}>
        <div className="loginContainer__loginForm__inputContainer">
            <div className = "loginContainer__loginForm__inputContainer__username" id = "input_0">
                <i className="fa fa-user input_icon"></i>
                <input
                    className="loginContainer__loginForm__inputContainer__username__input"
                    type="text"
                    name = "username"
                    placeholder="Username"
                    defaultValue = {sessionStorage.getItem('username')}
                    ref = {usernameRef}
                />
            </div>
            <div className="errorMessage" id="error_message_0">
					<img
						className="errorMessage--display__icon"
						src={error_icon}
						alt="error_icon"
					/>
					<div className="errorMessage--display__text">
						This field is required
					</div>
			</div>
            <div className="errorMessage" id="error_message_0_invalid">
					<img
						className="errorMessage--display__icon"
						src={error_icon}
						alt="error_icon"
					/>
					<div className="errorMessage--display__text">
						Invalid Username
					</div>
			</div>
            <div className="errorMessage" id="error_message_0_invalid">
					<img
						className="errorMessage--display__icon"
						src={error_icon}
						alt="error_icon"
					/>
					<div className="errorMessage--display__text">
						Invalid Username
					</div>
			</div>
            <div className = "loginContainer__loginForm__inputContainer__password" id = "input_1">
                <i className="fa fa-lock input_icon"></i>
                <input
                    className="loginContainer__loginForm__inputContainer__password__input"
                    type="text"
                    name = "password"
                    placeholder="Password"
                    ref = {passwordRef}
                />
            </div>
            <div className="errorMessage" id="error_message_1">
					<img
						className="errorMessage--display__icon"
						src={error_icon}
						alt="error_icon"
					/>
					<div className="errorMessage--display__text">
						This field is required
					</div>
			</div>
            <div className="errorMessage" id="error_message_1_invalid">
					<img
						className="errorMessage--display__icon"
						src={error_icon}
						alt="error_icon"
					/>
					<div className="errorMessage--display__text">
						Invalid Password
					</div>
			</div>
          <button className="loginContainer__loginForm__inputContainer__submit" onClick={handleSubmit}>
            Login
          </button>
          <div className="loginContainer__loginForm__inputContainer__forget">
            Forgot Username/Password ?
          </div>
        </div>
        <div className="loginContainer__loginForm__register">
          Not a member? <span className="underline">Sign up now!</span>
        </div>
      </form>
    </div>
    </div>
    </>
  )
}
