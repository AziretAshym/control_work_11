import { createSlice } from '@reduxjs/toolkit';
import { addNewItem, getItemById, getItems } from './itemsThunks';
import { Item } from '../../types';
import { RootState } from '../../app/store.ts';

interface ItemsState {
  items: Item[];
  selectedItem: Item | null;
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

export const selectItems = (state: RootState) => state.items.items;
export const selectSelectedItem = (state: RootState) => state.items.selectedItem;
export const selectLoading = (state: RootState) => state.items.loading;
export const selectError = (state: RootState) => state.items.error;

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(addNewItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(getItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedItem = null;
      })
      .addCase(getItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(getItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const itemsReducer = itemsSlice.reducer;
