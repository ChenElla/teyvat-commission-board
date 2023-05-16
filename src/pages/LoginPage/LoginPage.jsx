import LoginForm from "../../components/LoginForm/LoginForm";
import PropTypes from "prop-types";
LoginPage.propTypes = {
    userId:PropTypes.string,
  setUserId:PropTypes.func,
  setPageNum:PropTypes.func,
  setUserProfile:PropTypes.func
};
export default function LoginPage({userId, setUserId, setPageNum, setUserProfile}) {
    setPageNum(1);
	return <LoginForm userId = {userId} setUserId ={setUserId} setUserProfile= {setUserProfile}/>;
}