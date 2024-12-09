import { FC, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { TOrderInfo } from '../ui/order-info/type';
import { fetchOrder } from '../../services/slices/ordersSlice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const orderData = useSelector((state) => state.orders.orderData);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();

  useEffect(() => {
    if (number) {
      dispatch(fetchOrder(+number));
    }
  }, [dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;
    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc: number, item: TIngredient & { count: number }) =>
        acc + item.price * item.count,
      0
    );

    const ingredientIds = orderData.ingredients;

    return {
      _id: orderData._id,
      status: orderData.status,
      name: orderData.name,
      createdAt: orderData.createdAt,
      updatedAt: orderData.updatedAt,
      number: orderData.number,
      ingredientsInfo,
      date,
      total,
      ingredients: ingredientIds
    } as TOrderInfo;
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
