import styles from "./app.module.css";
import AppHeader from "../AppHeader/appHeader";
import { Routes, Route, useLocation } from 'react-router-dom';
// import { Route, Routes, useLocation } from "react-router-dom";
import IngredientDetailsPage from "../../pages/IngredientDetailsPage";
import Home from "../../pages/home";
import Login from "../../pages/login/login";
import Register from "../../pages/login/register";
import ForgotPassword from "../../pages/login/forgot-password";
import ResetPassword from "../../pages/login/reset-password";
import Profile from "../../pages/login/profile";
import Modal from "../Modal/modal";
import { useDispatch } from 'react-redux';
import { getBurgerIngridientsData } from '../../services/actions/burgerIngridientsAction';
import React from 'react';
import { OnlyAuth, OnlyUnAuth } from "../../pages/protected-route/protected-route";
import { checkUserAuth } from "../../utils/Api";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Order from "../../pages/login/order";
import { WS_CONNECTION_START_ORDERS, WS_SEND_MESSAGE_ORDERS } from "../../services/actions/ordersAction";
import Feed from "../../pages/login/feed";

function App() {
  const { ok } = useSelector((store) => store.user);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  React.useEffect(
    () => {
      dispatch(getBurgerIngridientsData());
      dispatch(checkUserAuth());
    }, []
);

const handleClose = (e) => {
  if (location.pathname ==="/") {
    navigate("/")
  } else {
    navigate(-1)
  }
}

React.useEffect(
  () => {
    if (ok) {
      navigate('/reset-password')
    }
  }, [ok]
)

return (
  <div className={styles.app}>
    <AppHeader />
    <Routes location={background || location}>
      <Route path="/" element={<Home />} />
      <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
      <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
      <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
      <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
      <Route path="/reset-password" element={<OnlyUnAuth component={ok ? <ResetPassword /> : <Navigate to='/forgot-password' replace />} />} />
      <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
      <Route path="/profile/orders" element={<OnlyAuth component={<Profile />} />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/feed/:id" element={<Order />} />
      <Route path="/profile/orders/:id" element={<OnlyAuth component={<Order />} />} />
    </Routes>
    {background && (
      <Routes>
        <Route path="/ingredients/:id" element={<Modal handleClose={handleClose}><IngredientDetailsPage /></Modal>} />
        <Route path="/profile/orders/:id" element={<Modal handleClose={handleClose}><Order /></Modal>} />
        <Route path="/feed/:id" element={<Modal handleClose={handleClose}><Order /></Modal>} />
      </Routes>
    )}
  </div>
);
}

export default App;
