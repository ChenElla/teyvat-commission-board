import { BACKEND_URL } from "../../utils/backend";
import Loading from "../Loading/Loading";
import axios from "axios";
import "./Profile.scss";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

EditProfile.propTypes = {
  userProfile: PropTypes.object,
  setUserProfile: PropTypes.func
};
export default function EditProfile(props) {
  const userId = sessionStorage.getItem("userId");
  const { userProfile, setUserProfile} = props;
  const formRef= useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const t = e.target;
    const newProfile = {
      username: t.username.value,
      signature: t.signature.value,
      uid:t.uid.value,
      server: t.server.value,
      email: t.email.value,
      wl: t.wl.value,
      ar: t.ar.value,
    };
    if (t.signature.value.length>35){
        alert("please enter no more than 35 characters for your signature!");
        return;
    }
    axios
      .put(`${BACKEND_URL}/users/${userId}`, newProfile)
      .then((response) => {
        const newUserProfile = userProfile;
        newUserProfile.data.username = t.username.value;
        newUserProfile.data.signature = t.signature.value;
        newUserProfile.data.email = t.email.value;
        newUserProfile.data.server = t.server.value;
        newUserProfile.data.wl = t.wl.value;
        newUserProfile.data.ar = t.ar.value;
        newUserProfile.data.uid = t.uid.value;
        setUserProfile(newUserProfile);
        sessionStorage.setItem("server",t.server.value);
        console.log(userProfile.data.ar);
        alert("successfully updated your profile!");
      })
      .catch((error) => console.log(error.message));
  };
  if (userProfile)
    return (
        <form className="profile__profileContainer profileContainer2" onSubmit={submitHandler} ref = {formRef}>
          <div className="profile__profileContainer__data">
            <div className="profile__profileContainer__data__profileData">
              <div className="profile__profileContainer__data__profileData__item">
                <label className="profile__profileContainer__data__profileData__item__label">
                  username
                </label>
                <input
                  className="profile__profileContainer__data__profileData__item__input long_input"
                  name="username"
                  defaultValue={userProfile.data.username}
                required/>
              </div>
              <div className="profile__profileContainer__data__profileData__item">
                <label className="profile__profileContainer__data__profileData__item__label">
                  UID
                </label>
                <input
                  className="profile__profileContainer__data__profileData__item__input long_input"
                  name="uid"
                  defaultValue={userProfile.data.uid}
                  />
              </div>
              <div className="profile__profileContainer__data__profileData__item">
                <label className="profile__profileContainer__data__profileData__item__label">
                  signature
                </label>
                <textarea
                  className="profile__profileContainer__data__profileData__signature__input long_input"
                  name="signature"
                  defaultValue={userProfile.data.signature}
                  placeholder = "( < 35 )"
                />
              </div>
              <div className="profile__profileContainer__data__profileData__item">
                <label className="profile__profileContainer__data__profileData__item__label">
                  email
                </label>
                <input
                  className="profile__profileContainer__data__profileData__item__input long_input"
                  name="email"
                  defaultValue={userProfile.data.email}
                  required/>
              </div>
              
              <div className="profile__profileContainer__data__profileData__item ">
                <label className="profile__profileContainer__data__profileData__item__label">
                  server
                </label>
                <select
                  className="profile__profileContainer__data__profileData__item__input long_input"
                  name="server"
                  defaultValue={userProfile.data.server}
                  required>
                  <option value="America">America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                  <option value="TW,HK,MO">TW,HK,MO</option>
                </select>
              </div>
            </div>
            <div className="profile__profileContainer__data__gamedata2">
              <div className="profile__profileContainer__data__gamedata2__item">
                <label
                  className="profile__profileContainer__data__gamedata2__item__label"
                  alt="World Level"
                >
                  WL
                </label>
                <input
                  className="profile__profileContainer__data__gamedata2__item__input"
                  name="wl"
                  defaultValue={userProfile.data.wl}
                  placeholder = "( 0 ~ 8 )"
                />
              </div>
              <div className="profile__profileContainer__data__gamedata2__item">
                <label
                  className="profile__profileContainer__data__gamedata2__item__label"
                  alt="Adventurer Rank"
                >
                  AR
                </label>
                <input
                  className="profile__profileContainer__data__gamedata2__item__input"
                  name="ar"
                  defaultValue={userProfile.data.ar}
                  placeholder = "( 0 ~ 60 )"
                />
              </div>
            </div>
          </div>
          <div className="profile__profileContainer__buttons">
            <div className="profile__profileContainer__buttons__cancel" onClick = {()=>formRef.current.reset()}
            >
              Cancel
            </div>
            <button className="profile__profileContainer__buttons__save" >
              Save
            </button>
          </div>
        </form>
    );
  else return <Loading />;
}
