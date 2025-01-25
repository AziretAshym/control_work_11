import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { RootState } from '../../../app/store.ts';
import { getCategories } from '../categoryThunks.ts';
import { useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import { getItems } from '../../items/itemsThunks.ts';

const Categories = () => {
  const dispatch = useAppDispatch();

  const { categories, loading: categoriesLoading } = useAppSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getItems({ categoryId: null }));
  }, [dispatch]);

  const handleCategoryClick = (categoryId: string | null) => {
    dispatch(getItems({ categoryId }));
  };

  return (
    <>
      {categoriesLoading ? (
        <CircularProgress />
      ) : (
        <>
          <List
            sx={{ width: '100%', maxWidth: 320, marginRight: 30 }}
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
            <ListItemButton onClick={() => handleCategoryClick(null)}>
              <ListItemText primary="All items" />
            </ListItemButton>

            {categories.map((category) => (
              <ListItemButton
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
              >
                <ListItemText primary={category.title} />
              </ListItemButton>
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default Categories;
