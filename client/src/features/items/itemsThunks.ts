import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getItems = createAsyncThunk<Item[], void>(
  "items/getItems",
  async () => {
    const response = await axiosApi<Item[]>("/items");
    return response.data;
  },
);