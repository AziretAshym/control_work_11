import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ItemMutation } from '../../../types';
import Grid from '@mui/material/Grid2';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from '../../../app/hooks.ts';
import { selectLoading } from '../itemsSlice.ts';
import { getCategories } from '../../categories/categoryThunks.ts';
import FileInput from '../../../../components/FileInput/FileInput.tsx';
import { selectCategories } from '../../categories/categorySlice.ts';

interface Props {
  onSubmit: (item: ItemMutation) => void;
}

const initialState = {
  title: "",
  description: "",
  price: 0,
  image: null as File | null,
  category: ""
};

const NewItemForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<ItemMutation>(initialState);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(getCategories())
      .unwrap()
      .catch(() => toast.error('Failed to load categories!'));
  }, [dispatch]);

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setForm((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.category || !form.price || !form.image) {
      return toast.error("All fields are required!");
    }

    onSubmit({ ...form });
    setForm(initialState);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mt: 4,
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          color: "#041f4e",
        }}
      >
        Add new post
      </Typography>
      <form onSubmit={submitFormHandler}>
        <Grid
          container
          direction="column"
          spacing={3}
          sx={{
            maxWidth: 500,
            margin: "0 auto",
            mt: 4,
            padding: "20px",
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.9)",
          }}
        >
          <Grid>
            <TextField
              id="title"
              name="title"
              label="Title"
              value={form.title}
              onChange={inputChangeHandler}
              fullWidth
              sx={{
                borderRadius: "8px",
                "& .MuiInputBase-root": {
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                },
              }}
            />
          </Grid>

          <Grid>
            <TextField
              id="description"
              name="description"
              label="Description"
              value={form.description}
              onChange={inputChangeHandler}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>

          <Grid>
            <FileInput
              name="image"
              label="Image"
              onGetFile={fileEventChangeHandler}
            />
          </Grid>

          <Grid>
            <TextField
              id="price"
              name="price"
              label="Price"
              type="number"
              value={form.price}
              onChange={inputChangeHandler}
              fullWidth
            />
          </Grid>

          <Grid>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={form.category}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: "linear-gradient(90deg, #1E3A8A, #2563EB)",
                borderRadius: "20px",
                textTransform: "uppercase",
                padding: "12px",
                "&:hover": {
                  background: "linear-gradient(90deg, #2563EB, #1E3A8A)",
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress /> : "Create"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewItemForm;
