
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styling/global.scss";
import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CommissionBoardPage from "./pages/CommissionBoardPage/CommissionBoardPage";
import UserComPage from "./pages/UserComPage.jsx/UserComPage";
import { BACKEND_URL } from "./utils/backend";
import axios from "axios";
import { useEffect } from "react";
import ChatRoomPage from './pages/ChatRoomPage/ChatRoomPage';
import LandingPage from "./pages/LandingPage/LandingPage";


function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [userId,setUserId] = useState(null);
  const [pageNum,setPageNum] = useState(0);
  return (
      <div className="root">
      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path = "/" element = {<LandingPage/>}/>
            <Route path = "/login" element = {<LoginPage userId = {userId} setUserId = {setUserId} setPageNum = {setPageNum} setUserProfile={setUserProfile}/>}/>
            <Route path ="/profile" element = {<ProfilePage userProfile = {userProfile} userId = {userId} setUserId = {setUserId} setUserProfile = {setUserProfile} setPageNum = {setPageNum}/>}/>
            <Route path ="/commission_board" element = {<CommissionBoardPage setPageNum = {setPageNum} userProfile={userProfile}/>}/>
            <Route path = "/user_commissions" element = {<UserComPage userProfile = {userProfile} setPageNum = {setPageNum}/>}/>
            <Route path = "/chat_room" element = {<ChatRoomPage userId = {userId} setPageNum = {setPageNum}/>}/>
          </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
