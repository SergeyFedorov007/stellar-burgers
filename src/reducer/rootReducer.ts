import { combineReducers } from 'redux';
import { ingredientsReducer } from '../../src/services/slices/ingredientsSlice';
import { constructorItemsReducer } from '../../src/services/slices/constructorItemsSlice';
import { orderModalDataReducer } from '../../src/services/slices/orderModalDataSlice';
import { ordersReducer } from '../../src/services/slices/ordersSlice';
import { authReducer } from '../../src/services/slices/authSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  orderModalData: orderModalDataReducer,
  orders: ordersReducer,
  auth: authReducer
});
