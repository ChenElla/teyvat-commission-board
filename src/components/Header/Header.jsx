import { Link } from "react-router-dom";
import logo_line from "../../assets/logo/Tecobo_line.png";

import cb_icon_static from "../../assets/icons/checklist.png";
import rc_icon_static from "../../assets/icons/clipboard.png";
import chat_icon_static from "../../assets/icons/chat.png";
import us_icon_static from "../../assets/icons/profile.png";
import home_icon from "../../assets/icons/house.svg";
import PropTypes from "prop-types";
Header.propTypes = {
  pageNum: PropTypes.number,
};
// import { Helmet } from "react-helmet";
import "./Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
export default function Header() {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img
              id="logo"
              className="header__headerContainer__logo--line"
              src={logo_line}
              alt="Tecobo_line"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  <img
                    className="header__headerContainer__navigation__commissionBoard__icon icon"
                    src={home_icon}
                    alt="home_icon"
                  />
                  Home
                </Link>
              </li>

              {sessionStorage.getItem('userId')&&(<li className="nav-item">
                <Link
                  to="/commission_board"
                  className="nav-link active"
                  aria-current="page"
                >
                  <img
                    className="header__headerContainer__navigation__commissionBoard__icon icon"
                    src={cb_icon_static}
                    alt="commissions_icon"
                  />
                  Commission Board
                </Link>
              </li>)}
              {sessionStorage.getItem("userId") && (
                <li className="nav-item">
                  <Link
                    to="/user_commissions"
                    className="nav-link active"
                    aria-current="page"
                  >
                    <img
                      className="header__headerContainer__navigation__requestedCommissions__icon icon"
                      src={rc_icon_static}
                      alt="requests_icon"
                    />
                    Your Commissions
                  </Link>
                </li>
              )}
              {sessionStorage.getItem("userId") && (
                <li className="nav-item">
                  <Link
                    to="/chat_room"
                    className="nav-link active"
                    aria-current="page"
                  >
                    <img
                      className="header__headerContainer__navigation__chatFunction__icon icon"
                      src={chat_icon_static}
                      alt="chat_icon"
                    />
                    Messages
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  to={sessionStorage.getItem("userId") ? "/profile" : "/login"}
                  className="nav-link active"
                  aria-current="page"
                >
                  <img
                    className="header__headerContainer__navigation__user__icon icon"
                    src={us_icon_static}
                    alt="user_profile_icon"
                  />
                  {sessionStorage.getItem("userId") ? "Your Profile" : "Log In"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    // </div>

    /* <Link to="/">
                    <img
                        id = "logo"
                        className="header__headerContainer__logo--line"
                        src={logo_line}
                        alt="Tecobo_line"
                    />
                </Link>
                <div className="header__headerContainer__navigation">
                    <div 
                        className = {pageNum === 4? "header__headerContainer__navigation__commissionBoard currentPage":"header__headerContainer__navigation__commissionBoard"}  
                            onMouseOver={e => (e.currentTarget.firstElementChild.setAttribute("src",cb_icon))}
                            onMouseOut={e => (e.currentTarget.firstElementChild.setAttribute("src",cb_icon_static))} onClick = {()=>navigate('/commission_board')}>
                        <img
                            className="header__headerContainer__navigation__commissionBoard__icon icon"
                            src={cb_icon_static}
                            alt="commissions_icon"
                            
                        />
                        <div className = "header__headerContainer__navigation__commissionBoard__label navigation_label">
                            Commission Board
                        </div>
                    </div>
                    <div className={pageNum === 3? "header__headerContainer__navigation__requestedCommissions currentPage":"header__headerContainer__navigation__requestedCommissions"}  
                            onMouseOver={e => (e.currentTarget.firstElementChild.setAttribute("src",rc_icon))}
                            onMouseOut={e => (e.currentTarget.firstElementChild.setAttribute("src",rc_icon_static))}
                            onClick = {()=>navigate('/user_commissions')}>
                        <img
                            className="header__headerContainer__navigation__requestedCommissions__icon icon"
                            src={rc_icon_static}
                            alt="requests_icon"
                        />
                        <div className = "header__headerContainer__navigation__requestedCommissions__label navigation_label">
                            Your Commissions
                        </div>
                    </div> 
                    <div className={pageNum === 2? "header__headerContainer__navigation__chatFunction currentPage":"header__headerContainer__navigation__chatFunction"}
                    onMouseOver={e => (e.currentTarget.firstElementChild.setAttribute("src",chat_icon))}
                            onMouseOut={e => (e.currentTarget.firstElementChild.setAttribute("src",chat_icon_static))}
                            onClick = {()=>navigate('/chat_room')}>
                        <img
                            className="header__headerContainer__navigation__chatFunction__icon icon"
                            src={chat_icon_static}
                            alt="chat_icon"
                        />
                        <div className = "header__headerContainer__navigation__chatFunction__label navigation_label">
                           Messages
                        </div>
                    </div>
                    <div className={pageNum === 1? "header__headerContainer__navigation__user currentPage":"header__headerContainer__navigation__user"}
                    onMouseOver={e => (e.currentTarget.firstElementChild.setAttribute("src",us_icon))}
                            onMouseOut={e => (e.currentTarget.firstElementChild.setAttribute("src",us_icon_static))} onClick ={()=>navigate('/profile')}>
                        <img
                            className="header__headerContainer__navigation__user__icon icon"
                            src={us_icon_static}
                            alt="user_profile_icon"
                        />
                    </div> 
                </div> 
            </div>
        </div>*/
  );
}
