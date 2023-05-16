import RequestedRecords from '../../components/CommissionBoard/RequestRecords.jsx/RequestRecords'
import PropTypes from "prop-types";
UserComPage.propTypes = {
  userProfile: PropTypes.object,
  setPageNum:PropTypes.func,
};
export default function UserComPage({userProfile, setPageNum}) {
    setPageNum(3);
  return (
    <RequestedRecords userProfile = {userProfile}/>
  )
}
