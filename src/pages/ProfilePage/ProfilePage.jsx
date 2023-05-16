import Profile from "../../components/Profile/Profile";
import PropTypes from "prop-types";
ProfilePage.propTypes = {
  userProfile: PropTypes.object,
  setUserProfile: PropTypes.func,
  userId:PropTypes.string,
  setUserId:PropTypes.func,
  setPageNum:PropTypes.func
};
export default function ProfilePage({userProfile,setUserProfile, userId, setUserId, setPageNum}) {
    setPageNum(1);
	return <Profile userProfile= {userProfile} setUserProfile={setUserProfile} userId = {userId} setUserId = {setUserId} />;
}