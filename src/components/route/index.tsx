import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

// Типы
type ProtectedRouteProps = {
  children: React.ReactElement;
  anonymous?: boolean;
};

// Защищенный маршрут
const ProtectedRoute = ({ anonymous, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const accessToken = getCookie('accessToken');
  const from = location.state?.from || { pathname: '/' };

  if (anonymous && accessToken) {
    return <Navigate replace to={from} />;
  }

  if (!anonymous && !accessToken) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
