import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../utils/type";
import React, { FC } from "react";
import { checkUserAuth } from "../../utils/Api";
import { SET_AUTHCHECKED } from "../../services/actions/userAction";
import { useDispatch } from '../../utils/type';
import { RootState } from "../../utils/type";

interface IprotectedProps {
  onlyUnAuth?: boolean;
  component: React.ReactElement;
}

const Protected: FC<IprotectedProps> = ({ onlyUnAuth = false, component }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({
      type: SET_AUTHCHECKED,
      payload: false
    });
    dispatch(checkUserAuth());
  }, [dispatch]);

  const isAuthChecked = useSelector((store: RootState) => store.user.isAuthChecked);
  const user = useSelector((store: RootState) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    return null; // или прелоадер
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
    // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    // Сервер не ответил
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // (!onlyUnAuth && user) {
    return component;
  //}
};

export const OnlyAuth: React.FC<IprotectedProps> = (props) => <Protected onlyUnAuth={false} {...props} />;
export const OnlyUnAuth: React.FC<IprotectedProps> = (props) => <Protected onlyUnAuth={true} {...props} />;