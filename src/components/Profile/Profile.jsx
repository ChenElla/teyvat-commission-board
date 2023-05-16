import { useEffect, useState } from "react";
import paimon_icon from "../../assets/userIcons/paimon_default.png";
import edit_icon from "../../assets/icons/edit.svg";
import back_icon from "../../assets/icons/arrow_back.svg";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";
import EditProfile from "./EditProfile";
import PropTypes from "prop-types";
Profile.propTypes = {
  userProfile: PropTypes.object,
  setUserProfile: PropTypes.func,
  userId: PropTypes.string,
  setUserId: PropTypes.func,
};
export default function Profile({
  userProfile,
  setUserProfile,
  userId,
  setUserId,
}) {
  const signOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("userId");
    setUserId(null);
    navigate("/login");
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) navigate("/login");
  });
  if (userProfile) {
      return (
        <div className="container profileContainer">
          <div className="profile scrollY">
            <div className="profile__profileContainer">
              <div className="profile__profileContainer__iconContainer">
                <div className = "profile__profileContainer__iconContainer__userIconContainer">
                    <img
                    src={paimon_icon}
                    alt="user_icon"
                    className="profile__profileContainer__iconContainer__icon"
                    />
                    <div className="profile__profileContainer__iconContainer__username">
                    <label className="profile__profileContainer__iconContainer__username__name">
                        {userProfile.data.username}
                    </label>
                    </div>
                    <div className="profile__profileContainer__iconContainer__uid">
                    UID:{userProfile.data.uid}
                    </div>
                </div>
                <div className="profile__profileContainer__iconContainer__signatureContainer">
                  <label className="profile__profileContainer__iconContainer__signatureContainer__signature">
                    {userProfile.data.signature || "No signature"}
                  </label>
                </div>
              </div>
              <div className="profile__profileContainer__data">
                <div className="profile__profileContainer__data__item">
                  <label className="profile__profileContainer__data__item__label">
                    email:
                  </label>
                  <div className="profile__profileContainer__data__item__value">
                    {" "}
                    {userProfile.data.email}{" "}
                  </div>
                </div>
                <div className="profile__profileContainer__data__gamedata">
                  <div className="profile__profileContainer__data__gamedata__item">
                    <label className="profile__profileContainer__data__gamedata__item__label">
                      server:
                    </label>
                    <div className="profile__profileContainer__data__gamedata__item__value">
                      {" "}
                      {userProfile.data.server}
                    </div>
                  </div>
                  <div className="profile__profileContainer__data__gamedata__item">
                    <label
                      className="profile__profileContainer__data__gamedata__item__label"
                      alt="World Level"
                    >
                      WL:
                    </label>
                    <div className="profile__profileContainer__data__gamedata__item__value">
                      {userProfile.data.wl}
                    </div>
                  </div>
                  <div className="profile__profileContainer__data__gamedata__item">
                    <label
                      className="profile__profileContainer__data__gamedata__item__label"
                      alt="Adventurer Rank"
                    >
                      AR:
                    </label>
                    <div className="profile__profileContainer__data__gamedata__item__value">
                      {userProfile.data.ar}
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile__profileContainer__signOut">
                {Date().now}
                <div
                  className="profile__profileContainer__signOut__button"
                  onClick={signOut}
                >
                  Sign out?
                </div>
              </div>
            </div>
            <EditProfile
                userProfile={userProfile}
                setUserProfile={setUserProfile}
            />
          </div>
        </div>
      );
  } else {
    return <Loading />;
  }
}
