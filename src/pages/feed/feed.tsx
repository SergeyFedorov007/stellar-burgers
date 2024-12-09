import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrders } from '../../services/slices/ordersSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchOrders());
  };

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
