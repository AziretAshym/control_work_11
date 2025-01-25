import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getCategories = createAsyncThunk<ICategory[], void>(
  "categories/getCategories",
  async () => {
    const response = await axiosApi.get("/categories");
    return response.data;
  },
);