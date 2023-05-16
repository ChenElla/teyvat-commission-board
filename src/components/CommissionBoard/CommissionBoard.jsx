import "./CommissionBoard.scss";
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils/backend";
import Loading from "../Loading/Loading";
import Commission from "./Commission/Commission";
import filter_icon from "../../assets/icons/filter.png";
import NoContents from "../NoContents/NoContents";
import PropTypes from "prop-types";
CommissionBoard.propTypes = {
  userProfile:PropTypes.object
};
export default function CommissionBoard({userProfile}) {
  const [allCommissions, setAllCommissions] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [received, setReceived] = useState(false);
  const [server, setServer] = useState(
    sessionStorage.getItem("server") || "America"
  );
  //FILTER
  const [ar, setAr] = useState(0);
  const [wl, setWl] = useState(0);
  const [duration, setDuration] = useState("4");
  const [location, setLocation] = useState("All");
  //0~20mins, 20min~40mins, 40mins~60mins, >1hr, all
  //0, 1, 2, 3, 4
  const [category, setCategory] = useState("All");
  const [requiredNum, setRequiredNum] = useState("All");
  const [acceptedCom, setAcceptedCom] = useState(userProfile&&userProfile.data.historyCommissions?userProfile.data.historyCommissions.map(hc => hc.id):[]);
  const [filterOn,setFilterOn] = useState(false);
  const formRef = useRef();
  const clearFilter = (e)=>{
    e.preventDefault();
    setRequiredNum("All");
    setServer(sessionStorage.getItem("server") || "America");
    setAr(0);
    setWl(0);
    setCategory("All");
    setDuration(4);
    setLocation("All");
    formRef.current.reset();
  }
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/commissions/available`)
      .then((response) => {
        setAllCommissions(response.data);
        const serverSelected = response.data.filter(com => com.data.server == server&&(!acceptedCom||!(acceptedCom.includes(com.id))))
        setCommissions(serverSelected);
        setReceived(true);
      })
      .catch((error) => console.log(error.message));
  }, [server]);
  useEffect(() => {
    const filteredCom = allCommissions.filter(
      (commission) =>
        !acceptedCom.find((id) => id === commission.id) &&
        commission.data.ar >= ar &&
        commission.data.wl >= wl &&
        (duration == "4"
          ? true
          : commission.data.duration == duration) &&
          (category == "All"
          ? true
          : commission.data.category == category)  &&
          (requiredNum == "All"
          ? true
          : commission.data.requiredPlayerNumber == requiredNum) &&
          (location == "All"
          ? true
          : commission.data.location == location)&&
        commission.data.server === server
    );
    setCommissions(filteredCom);
  }, [allCommissions, ar, wl, duration, category, location, requiredNum, acceptedCom, server]);
  if (received)
    return (
      <div className="commissionBoard">
        <div className ="comCon">
        <div className="commissionBoard__title">
          <div className="commissionBoard__title__label">COMMISSION BOARD</div>
          <div className={filterOn?"commissionBoard__title__filter--active":"commissionBoard__title__filter"} onClick ={()=>setFilterOn(!filterOn)}>
            <img
              className="commissionBoard__title__filter__icon"
              src={filter_icon}
              alt="filter_icon"
            />
            <div className="commissionBoard__title__filter__text">Filter</div>
          </div>
        </div>
        <div className="commissionBoard__commissionBoardContainer">
          <form className={filterOn?"commissionBoard__commissionBoardContainer__filterContainer ":"display_none"} ref ={formRef}>
            <div className="commissionBoard__commissionBoardContainer__filterContainer__server">
              <div className="commissionBoard__commissionBoardContainer__filterContainer__server__label">
                server:
              </div>
              <select
                className="commissionBoard__commissionBoardContainer__filterContainer__server__input filter_input"
                name="server"
                defaultValue={server}
                onChange = {(e) => setServer(e.currentTarget.value)}
              >
                <option value="America">America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="TW,HK,MO">TW,HK,MO</option>
              </select>
            </div>
            <div className="commissionBoard__commissionBoardContainer__filterContainer__category">
              <div className="commissionBoard__commissionBoardContainer__filterContainer__server__label">
                category:
              </div>
              <select
                className="commissionBoard__commissionBoardContainer__filterContainer__category__input filter_input"
                name="category"
                defaultValue = "All"
                onChange = {(e) => setCategory(e.currentTarget.value)}
              >
                <option value="All">All</option>
                <option value="boss fighting">boss fighting</option>
                <option value="artifact farming">artifact farming</option>
                <option value="material farming">material farming</option>
                <option value="world exploration">world exploration</option>
                <option value="general advice">general advice</option>
              </select>
            </div>
            <div className="commissionBoard__commissionBoardContainer__filterContainer__location">
              <div className="commissionBoard__commissionBoardContainer__filterContainer__location__label">
                location:
              </div>
              <select
                className="commissionBoard__commissionBoardContainer__filterContainer__location__input filter_input"
                name="location"
                defaultValue ="All"
                onChange = {(e) => setLocation(e.currentTarget.value)}
              >
                <option value="All">All</option>
                <option value="Monstadt">Monstadt</option>
                <option value="Liyue">Liyue</option>
                <option value="Inazuma">Inazuma</option>
                <option value="Sumeru">Sumeru</option>
              </select>
            </div>
            <div className="commissionBoard__commissionBoardContainer__filterContainer__duration">
              <div className="commissionBoard__commissionBoardContainer__filterContainer__duration__label">
                duration:
              </div>
              <select
                className="commissionBoard__commissionBoardContainer__filterContainer__duration__input filter_input"
                name="duration"
                defaultValue = "4"
                onChange = {(e) => setDuration(e.currentTarget.value)}
              >
                <option value="0" label="0 ~ 20mins" />
                <option value="1" label="20 ~ 40mins" />
                <option value="2" label="40 ~ 60mins" />
                <option value="3" label=">= 1hr" />
                <option value="4" label="All" />
              </select>
            </div>
            <div className="commissionBoard__commissionBoardContainer__filterContainer__requiredNum">
              <div className="commissionBoard__commissionBoardContainer__filterContainer__requiredNum__label">
                # of Players Needed:
              </div>
              <select
                className="commissionBoard__commissionBoardContainer__filterContainer__requiredNum__input filter_input"
                name="requiredNum"
                defaultValue = "All"
                onChange = {(e) => setRequiredNum(e.currentTarget.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="All">All</option>
              </select>
            </div>
            <div className = "container">
              <div className="commissionBoard__commissionBoardContainer__filterContainer__wl">
                <div className="commissionBoard__commissionBoardContainer__filterContainer__wl__label">
                  WL{">="}
                </div>
                <input
                  className="commissionBoard__commissionBoardContainer__filterContainer__wl__input filter_input"
                  name="wl"
                  defaultValue="0"
                  placeholder="(0 ~ 8)"
                  onChange = {(e) => setWl(e.currentTarget.value)}
                />
              </div>
              <div className="commissionBoard__commissionBoardContainer__filterContainer__ar">
                <div className="commissionBoard__commissionBoardContainer__filterContainer__ar__label">
                  AR{">="}
                </div>
                <input
                  className="commissionBoard__commissionBoardContainer__filterContainer__ar__input filter_input"
                  name="ar"
                  defaultValue="0"
                  placeholder="(0 ~ 60)"
                  onChange = {(e) => setAr(e.currentTarget.value)}
                />
              </div>
            </div>
            <button className="commissionBoard__commissionBoardContainer__filterContainer__clearButton" onClick = {clearFilter}>
              Clear
            </button>
          </form>
          
          <div className="commissionBoard__commissionBoardContainer__commissions">
            {(commissions.length!=0)?(commissions.sort((a,b)=>b.data.timestamp-a.data.timestamp).map((com) => (
              <Commission
                key={com.id}
                commission={com}
                acceptedCom={acceptedCom}
                setAcceptedCom={setAcceptedCom}
              />
            ))):(<NoContents message = "O'oh! No commissions Found" submessage = "please clear the filter or select a different server to see other avialble commissions!" iconNum = {1}/>)}
          </div>
        </div>
        </div>
      </div>
    );
  else {
    return <Loading />;
  }
}
