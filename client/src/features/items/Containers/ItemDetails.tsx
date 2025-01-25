import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Card, CardMedia, CardContent, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectError, selectLoading, selectSelectedItem } from '../itemsSlice.ts';
import { getItemById } from '../itemsThunks.ts';
import { apiUrl } from '../../../globalConstants.ts'; // Убедитесь, что apiUrl корректен

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectSelectedItem);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (id) {
      dispatch(getItemById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center">
        {error}
      </Typography>
    );
  }

  if (!item) {
    return (
      <Typography color="textSecondary" variant="h6" align="center">
        Item not found
      </Typography>
    );
  }

  const itemImg = `${apiUrl}/${item.image}`;

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', my: 4, boxShadow: 3 }}>
      <CardMedia
        component="img"
        alt={item.title}
        height="300"
        image={itemImg}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Price: ${item.price}
        </Typography>
        {item.category && (
          <Typography variant="subtitle1" color="text.secondary">
            <strong>Category:</strong> {item.category.title}
          </Typography>
        )}
        {item.user && (
          <Typography variant="subtitle1" color="text.secondary" mt={1}>
            <strong>Seller:</strong> {item.user.username} - {item.user.phoneNumber}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ItemDetails;
