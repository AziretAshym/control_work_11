import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { ItemMutation } from '../../../types';
import { addNewItem, getItems } from '../itemsThunks.ts';
import { toast } from 'react-toastify';
import { selectUser } from '../../users/userSlice.ts';
import { useEffect } from 'react';
import NewItemForm from './NewItemForm.tsx';

const NewItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);


  const onSubmitForm = async (post: ItemMutation) => {
    try {
      await dispatch(addNewItem(post)).unwrap();
      toast.success('Item was successfully created!');
      await dispatch(getItems());
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <NewItemForm onSubmit={onSubmitForm}/>
    </>
  );
};

export default NewItem;
