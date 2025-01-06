import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from '../../services/slices/authSlice';
import { Preloader } from '@ui';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  anonymous?: boolean;
};

const ProtectedRoute = ({ anonymous, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  const from = location.state?.from || { pathname: '/' };

  // Локальное состояние для проверки авторизации
  const [loading, setLoading] = useState(true);

  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();

  useEffect(() => {
    // Если refreshToken существует, проверяем авторизацию
    if (refreshToken) {
      dispatch(checkAuthStatus(refreshToken))
        .then(() => setLoading(false)) // После успешной проверки меняем состояние на загружено
        .catch(() => setLoading(false)); // Если ошибка, тоже меняем на загружено
    } else {
      setLoading(false); // Если нет refreshToken, сразу меняем на загружено
    }
  }, [refreshToken, dispatch]);

  // Пока идет проверка, показываем прелоадер
  if (loading) {
    return <Preloader />;
  }

  if (anonymous && accessToken) {
    return <Navigate replace to={from} />;
  }

  if (!anonymous && !accessToken) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
