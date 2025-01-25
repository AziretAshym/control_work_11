import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { RootState } from '../../../app/store.ts';
import { getCategories } from '../categoryThunks.ts';
import { useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Alert, CircularProgress } from '@mui/material';

const Categories = () => {
  const dispatch = useAppDispatch();

  const { categories, loading, error } = useAppSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      {loading ? (<CircularProgress />) : (
        <List
          sx={{ width: "100%", maxWidth: 320, marginRight: 50 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader id="nested-list-subheader">
              <Typography variant="h5" fontWeight={700}>
                Items categories
              </Typography>
            </ListSubheader>
          }
        >

          <ListItemButton>
            <ListItemText primary="All items"/>
          </ListItemButton>

          {categories.map((category) => (
            <ListItemButton key={category._id}>
              <ListItemText primary={category.title} />
            </ListItemButton>
          ))}
        </List>
      )}
      {error ? (<Alert severity="error">{error}</Alert>): null}
    </>
  );
};

export default Categories;