import { FC } from 'react';
import {
  MenuList as MuiMenuList,
  ListItem,
  ListItemButton,
} from '@mui/material';

const MenuList: FC = () => {
  return (
    <MuiMenuList>
      <ListItem>
        <ListItemButton>Главная</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>Второй пункт</ListItemButton>
      </ListItem>
    </MuiMenuList>
  );
};

export default MenuList;
