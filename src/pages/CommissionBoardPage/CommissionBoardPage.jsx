import CommissionBoard from "../../components/CommissionBoard/CommissionBoard";
import PropTypes from "prop-types";
CommissionBoardPage.propTypes = {
  setPageNum:PropTypes.func,
  userProfile:PropTypes.object
};
export default function CommissionBoardPage({setPageNum, userProfile}) {
  setPageNum(4);
    return (
    <CommissionBoard userProfile = {userProfile}/>
  )
}
