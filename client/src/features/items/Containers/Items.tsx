import { useEffect } from 'react';
import { Alert, Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getItems } from '../itemsThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectError, selectItems, selectLoading } from '../itemsSlice.ts';
import { apiUrl } from '../../../globalConstants.ts';
import Categories from '../../categories/Components/Categories.tsx';
import Box from '@mui/material/Box';

const Items = () => {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectItems);
  const isLoading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <Box sx={{display: "flex", justifyContent: "space-between"}}>
      <Grid>
        <Categories />
      </Grid>

      <Grid>
        <Typography variant="h4" gutterBottom>
          Items
        </Typography>

        {isLoading ? (
          <div>
            <CircularProgress />
            <Typography variant="body2">Loading items...</Typography>
          </div>
        ) : (
          <>
            {items.length === 0 ? (
              <Typography variant="h6">No items available</Typography>
            ) : (
              <Grid container spacing={3}>
                {items.map((item) => {
                  const itemImg = `${apiUrl}/${item.image}`;
                  return (
                    <Grid key={item._id}>
                      <Card sx={{width: 300}}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={itemImg}
                          alt={item.title}
                        />
                        <CardContent>
                          <Typography variant="h6">
                            {item.title}
                          </Typography>
                          <Typography variant="h6">${item.price}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </>
        )}

        {error && <Alert severity="error">{error}</Alert>}
      </Grid>
    </Box>
  );
};

export default Items;
