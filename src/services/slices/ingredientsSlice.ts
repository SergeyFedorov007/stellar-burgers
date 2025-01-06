import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

// Thunk для загрузки ингредиентов
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

// Селекторы
export const selectIngredients = (state: RootState): TIngredient[] =>
  state.ingredients.ingredients;

// Интерфейсы
interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
  modal: {
    isOpen: boolean;
    ingredient: TIngredient | null;
  };
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null,
  modal: {
    isOpen: false,
    ingredient: null
  }
};

// Создание слайса для ингредиентов
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.ingredients = action.payload;
        }
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Не удалось получить ингредиенты';
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
