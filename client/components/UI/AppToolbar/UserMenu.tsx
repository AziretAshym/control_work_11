import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { logout } from '../../../src/features/users/userThunks.ts';
import { unsetUser } from '../../../src/features/users/userSlice.ts';
import { useAppDispatch } from '../../../src/app/hooks.ts';
import { UserFields } from '../../../src/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: UserFields;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
    navigate("/login");
  };
  return (
    <>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.username}!
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
