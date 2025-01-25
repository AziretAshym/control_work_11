import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item, ItemMutation } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

export const getItems = createAsyncThunk<Item[], { categoryId: string | null }>(
  "items/getItems",
  async ({ categoryId }) => {
    try {
      const filter = categoryId ? `/items?categoryId=${categoryId}` : '/items';
      const response = await axiosApi.get<Item[]>(filter);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);

export const getItemById = createAsyncThunk<Item, string>(
  "posts/getPostById",
  async (id) => {
    const { data } = await axiosApi.get<Item>(`/items/${id}`);
    return data;
  }
);

export const addNewItem = createAsyncThunk<void, ItemMutation, { state: RootState }>(
  "items/addNewItem",
  async (itemMutation, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      console.error("No token found");
      return;
    }

    const formData = new FormData();
    const keys = Object.keys(itemMutation) as (keyof ItemMutation)[];

    keys.forEach((key) => {
      const value = itemMutation[key];
      if (value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    try {
      await axiosApi.post("/items/", formData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.error(e)
    }
  }
);
