import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';

// Интерфейсы
interface OrdersState {
  orders: TOrder[];
  success: boolean;
  total: number;
  totalToday: number;
  request: boolean;
  orderData: TOrder | null;
  loading: boolean;
  error: string | null;
  status: 'pending' | 'done' | 'created';
}

const initialState: OrdersState = {
  orders: [],
  success: false,
  total: 0,
  totalToday: 0,
  request: false,
  orderData: null,
  loading: false,
  error: null,
  status: 'created'
};

// Thunk функция для ленты заказов
export const fetchOrders = createAsyncThunk('orders/fetchOrders', getFeedsApi);

// Thunk функция для деталей заказа
export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  getOrderByNumberApi
);

// Thunk функция для заказов пользователя
export const fetchProfileOrders = createAsyncThunk(
  'orders/fetchProfileOrders',
  getOrdersApi
);

// Создание слайса для заказов
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.success = true;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.success = false;
        state.loading = false;
      })

      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderData = action.payload.orders[0];
        state.loading = false;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderData = null;
        state.loading = false;
        state.error = action.error.message || 'Не удалось получить заказ';
      })

      .addCase(fetchProfileOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.orders = [];
        state.loading = false;
        state.success = false;
        state.error =
          action.error.message || 'Не удалось получить заказы пользователя';
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
