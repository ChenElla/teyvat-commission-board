import "../CommissionBoard.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/backend";
import Loading from "../../Loading/Loading";
import RequestedCommission from "../Commission/RequestedCommission";
import NoContents from "../../NoContents/NoContents";
import { useNavigate } from "react-router-dom";
import RequestForm from "../Commission/RequestForm";
import PropTypes from "prop-types";
RequestedRecords.propTypes = {
  userProfile: PropTypes.object
};
export default function RequestedRecords({userProfile}) {
  const [historyCommissions, setHistoryCommissions] = useState([]);
  const [completedCommissions, setCompletedCommissions] = useState([]);
  const [historyRequests, setHistoryRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [page, setPage] = useState(1); //1:current ongoing commissions(either posted or acceped)
  const [received, setReceived] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userProfile) 
        return navigate("/login");
    axios
      .get(`${BACKEND_URL}/users/${userProfile.id}/history_reqs`)
      .then((response) => {
        setHistoryRequests(response.data);
        setCompletedRequests(response.data.filter(com => com.data.isClosed));
        axios
          .get(`${BACKEND_URL}/users/${userProfile.id}/history_coms`)
          .then((response) => {
            setHistoryCommissions(response.data);
            setCompletedCommissions(response.data.filter(com => com.data.isClosed));
            setReceived(true);
          })
          .catch((error) => console.log(error.message));
      })
      .catch((error) => console.log(error.message));
  }, [userProfile, navigate]);
  if (received)
    return (
      <div className="commissionBoard">
        <div className = "comCon">
        <div className="commissionBoard__title">
          <div
            className={
              page == 1
                ? "commissionBoard__title__filter--active"
                : "commissionBoard__title__filter"
            }
            onClick={() => setPage(1)}
          >
            <div className="commissionBoard__title__filter__title">Ongoing</div>
          </div>
          <div
            className={
              page == 2
                ? "commissionBoard__title__filter--active"
                : "commissionBoard__title__filter"
            }
            onClick={() => setPage(2)}
          >
            <div className="commissionBoard__title__filter__title">History</div>
          </div>
          <div
            className={
              page == 3
                ? "commissionBoard__title__filter--active"
                : "commissionBoard__title__filter"
            }
            onClick={() => setPage(3)}
          >
            <div className="commissionBoard__title__filter__title">Request</div>
          </div>
        </div>
        {/* //PAGE1 */}
        {page == 1 && (
          <div className="sectionCom">
            <div className="sectionCom__sectionTitle__com">Ongoing Accepted Requests</div>
            <div className="commissionBoard__commissionBoardContainer ongoing_com">
              <div className="commissionBoard__commissionBoardContainer__commissions">
                {historyCommissions.filter((com) => !com.data.isClosed) !=
                0 ? (
                  historyCommissions
                    .filter((com) => !com.data.isClosed)
                    .sort((a,b)=>b.data.timestamp-a.data.timestamp)
                    .map((com) => (
                      <RequestedCommission key={com.id} commission={com} isRequest = {false} setHistoryRequests = {setHistoryRequests} historyRequests = {historyRequests} setCompletedRequests = {setCompletedRequests} completedRequests = {completedRequests} />
                    ))
                ) : (
                  <NoContents
                    message="No Ongoing Commissions..."
                    submessage="let's start accepting requests from our commission board!"
                    iconNum = {2}
                  />
                )}
              </div>
            </div>
            <div className="sectionCom__sectionTitle__req">Ongoing Posted Requests</div>
            <div className="commissionBoard__commissionBoardContainer ongoing_req">
              <div className="commissionBoard__commissionBoardContainer__commissions">
                {historyRequests.filter((com) => !com.data.isClosed).length !=
                0 ? (
                  historyRequests
                    .filter((com) => !com.data.isClosed)
                    .sort((a,b)=>b.data.timestamp-a.data.timestamp)
                    .map((com) => (
                      <RequestedCommission key={com.id} commission={com} isRequest = {true} setHistoryRequests = {setHistoryRequests} historyRequests = {historyRequests} setCompletedRequests = {setCompletedRequests} completedRequests = {completedRequests}/>
                    ))
                ) : (
                  <NoContents
                    message="No Ongoing Commissions..."
                    submessage="let's start accepting requests from our commission board!"
                    iconNum = {3}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {page == 2 && (
          <div className="sectionHis">
            <div className="sectionHis__sectionTitle__com">All Completed Commissions</div>
            <div className="commissionBoard__commissionBoardContainer history_com">
              <div className="commissionBoard__commissionBoardContainer__commissions">
                {completedCommissions.length != 0 ? (
                  completedCommissions.sort((a,b)=>b.data.timestamp-a.data.timestamp).map((com) => 
                    <RequestedCommission key={com.id} commission={com} isRequest = {false} setHistoryRequests = {setHistoryRequests} historyRequests = {historyRequests} setCompletedRequests = {setCompletedRequests} completedRequests = {completedRequests}/>)
                  
                ) : (
                  <NoContents
                    message="Have Not Yet Completed Any Commissions..."
                    submessage="let's start accepting requests from our commission board!"
                    iconNum = {3}
                  />
                )}
              </div>
            </div>
            <div className="sectionHis__sectionTitle__req">All Completed Requests</div>
            <div className="commissionBoard__commissionBoardContainer history_req">
              <div className="commissionBoard__commissionBoardContainer__commissions">
                {completedRequests.length != 0 ? (
                  completedRequests.sort((a,b)=>b.data.timestamp-a.data.timestamp).map((com) => (
                    <RequestedCommission key={com.id} commission={com} isRequest = {true} setHistoryRequests = {setHistoryRequests} historyRequests = {historyRequests} setCompletedRequests = {setCompletedRequests} completedRequests = {completedRequests}/>
                  ))
                ) : (
                  <NoContents
                    message="No Completed Requests Yet..."
                    submessage="let's start posting commission request!"
                    iconNum = {2}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {page == 3 && (
          <RequestForm historyRequests={historyRequests} userProfile={userProfile} setHistoryRequests={setHistoryRequests} />
        )}
        </div>
      </div>
    );
  else {
    return <Loading />;
  }
}
