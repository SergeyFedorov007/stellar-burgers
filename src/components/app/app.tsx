import '../../index.css';
import styles from './app.module.css';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppHeader } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Modal } from '../modal';
import { IngredientDetails } from '@components';
import ProtectedRoute from '../route';
import { FeedWithModal, ProfileOrderWithModal } from '../modal/numberModal';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const background = location.state?.background;

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Основные маршруты */}
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute anonymous>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute anonymous>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute anonymous>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute anonymous>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        {/* Отображаем NotFound404 только если не найден ни один маршрут */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      <Routes>
        <Route path='/feed/:number' element={<FeedWithModal />} />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингредиентов'
              onClose={() => {
                navigate('/');
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={<ProfileOrderWithModal />}
        />
      </Routes>
    </div>
  );
};

export default App;
