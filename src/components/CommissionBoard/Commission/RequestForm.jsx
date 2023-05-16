import "../CommissionBoard.scss";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/backend";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
RequestForm.propTypes = {
  historyRequests: PropTypes.array,
  userProfile:PropTypes.object,
  setHistoryRequests: PropTypes.func,
};
export default function RequestForm({ historyRequests, userProfile, setHistoryRequests }) {
  const [server, setServer] = useState(
    sessionStorage.getItem("server") || "America"
  );
  //FILTER
  const [ar, setAr] = useState(userProfile.data.ar||0);
  const [wl, setWl] = useState(userProfile.data.wl||0);
  const [details, setDetails] = useState("");
  const [duration, setDuration] = useState("4");
  const [location, setLocation] = useState("N/A");
  //0~20mins, 20min~40mins, 40mins~60mins, >1hr, all
  //0, 1, 2, 3, 4
  const navigate = useNavigate();
  const [category, setCategory] = useState("boss fighting");
  const [requiredNum, setRequiredNum] = useState("3");
  const formRef = useRef();
  const clearForm = (e) => {
    e.preventDefault();
    formRef.current.reset();
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const username = userProfile.data.username;
    const newCommission = {
      ar,
      wl,
      username,
      category,
      details,
      duration,
      userId: sessionStorage.getItem("userId"),
      isAvailable: true,
      isClosed: false,
      location,
      requiredPlayerNumber: requiredNum,
      server,
    };
    axios
      .post(`${BACKEND_URL}/commissions`, newCommission)
      .then((response) => {
        alert("successfully posted your request!");
        const newHisReqs = historyRequests;
        console.log(response.data);
        newHisReqs.push(response.data);
        setHistoryRequests(newHisReqs);
        sessionStorage.setItem("commission",JSON.stringify(response.data));
        console.log("no prob till here");
        navigate('/user_commissions');
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="formContainer">
      <form
        className="commissionBoard__commissionBoardContainer__filterContainer "
        ref={formRef}
      >
        <div className="commissionBoard__commissionBoardContainer__filterContainer__title ">
          Commission Request Form
        </div>
        <div className="commissionBoard__commissionBoardContainer__filterContainer__item">
          <div className="commissionBoard__commissionBoardContainer__filterContainer__item__label">
            server
          </div>
          <select
            className="commissionBoard__commissionBoardContainer__filterContainer__item__input filter_input"
            name="server"
            defaultValue={sessionStorage.getItem("server") || "America"}
            onChange={(e) => setServer(e.currentTarget.value)}
          >
            <option value="America">America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="TW,HK,MO">TW,HK,MO</option>
          </select>
        </div>
        <div className="commissionBoard__commissionBoardContainer__filterContainer__item">
          <div className="commissionBoard__commissionBoardContainer__filterContainer__item__label">
            category
          </div>
          <select
            className="commissionBoard__commissionBoardContainer__filterContainer__item__input filter_input"
            name="category"
            defaultValue={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
          >
            <option value="boss fighting">boss fighting</option>
            <option value="artifact farming">artifact farming</option>
            <option value="material farming">material farming</option>
            <option value="world exploration">world exploration</option>
            <option value="general advice">general advice</option>
          </select>
        </div>
        <div className="commissionBoard__commissionBoardContainer__filterContainer__item">
          <div className="commissionBoard__commissionBoardContainer__filterContainer__item__label">
            location
          </div>
          <select
            className="commissionBoard__commissionBoardContainer__filterContainer__item__input filter_input"
            name="location"
            defaultValue=""
            onChange={(e) => setLocation(e.currentTarget.value)}
          >
            <option value="N/A" label="N/A" />
            <option value="Monstadt">Monstadt</option>
            <option value="Liyue">Liyue</option>
            <option value="Inazuma">Inazuma</option>
            <option value="Sumeru">Sumeru</option>
          </select>
        </div>
        <div className="commissionBoard__commissionBoardContainer__filterContainer__item">
          <div className="commissionBoard__commissionBoardContainer__filterContainer__item__label">
            duration
          </div>
          <select
            className="commissionBoard__commissionBoardContainer__filterContainer__item__input filter_input"
            name="duration"
            defaultValue="4"
            onChange={(e) => setDuration(e.currentTarget.value)}
          >
            <option value="0" label="0 ~ 20mins" />
            <option value="1" label="20 ~ 40mins" />
            <option value="2" label="40 ~ 60mins" />
            <option value="3" label=">= 1hr" />
            <option value="4" label="N/A" />
          </select>
        </div>
        <div className="commissionBoard__commissionBoardContainer__filterContainer__item">
          <div className="commissionBoard__commissionBoardContainer__filterContainer__item__label">
            # of Players Needed:
          </div>
          <select
            className="commissionBoard__commissionBoardContainer__filterContainer__item__input filter_input"
            name="requiredNum"
            defaultValue="1"
            onChange={(e) => setRequiredNum(e.currentTarget.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="containerWA">
          <div className="commissionBoard__commissionBoardContainer__filterContainer__wl">
            <div className="commissionBoard__commissionBoardContainer__filterContainer__wl__label">
              WL{">="}
            </div>
            <input
              className="commissionBoard__commissionBoardContainer__filterContainer__wl__input filter_input"
              name="wl"
              defaultValue={wl}
              placeholder="(0 ~ 8)"
              onChange={(e) => setWl(e.currentTarget.value)}
            />
          </div>
          <div className="commissionBoard__commissionBoardContainer__filterContainer__ar">
            <div className="commissionBoard__commissionBoardContainer__filterContainer__ar__label">
              AR{">="}
            </div>
            <input
              className="commissionBoard__commissionBoardContainer__filterContainer__ar__input filter_input"
              name="ar"
              defaultValue={ar}
              placeholder="(0 ~ 60)"
              onChange={(e) => setAr(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="commissionBoard__commissionBoardContainer__filterContainer__details">
          <div className="commissionBoard__commissionBoardContainer__filterContainer__details__label">
            details
          </div>
          <textarea
            className="commissionBoard__commissionBoardContainer__filterContainer__details__input filter_input"
            name="details"
            defaultValue="N/A"
            placeholder="( < 35 )"
            onChange={(e) => setDetails(e.currentTarget.value)}
          />
        </div>
        <div className="buttonContainer">
          <button className="buttonContainer__clearButton" onClick={clearForm}>
            Clear
          </button>
          <button
            className="buttonContainer__submitButton"
            onClick={submitHandler}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
