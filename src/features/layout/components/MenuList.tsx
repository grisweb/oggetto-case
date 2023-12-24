import { FC, ReactNode } from 'react';
import {
  MenuList as MuiMenuList,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  lighten,
} from '@mui/material';
import { EventNote, People } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  path: string;
  title: string;
  icon: ReactNode;
}

const menuList: MenuItem[] = [
  {
    path: '/',
    title: 'Встречи',
    icon: <EventNote />,
  },
  {
    path: '/users',
    title: 'Пользователи',
    icon: <People />,
  },
];

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '15px',
  '& .MuiListItemIcon-root': {
    minWidth: '42px',
  },
  '& span': {
    fontSize: '0.9rem',
  },
  '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus': {
    backgroundColor: theme.palette.primary.light,
  },
  '&:hover, &:focus': {
    backgroundColor: lighten(theme.palette.primary.light, 0.6),
  },
}));

const MenuList: FC = () => {
  const { pathname } = useLocation();

  return (
    <MuiMenuList>
      {menuList.map((item) => (
        <ListItem key={item.title}>
          <StyledListItemButton
            selected={item.path === pathname}
            //@ts-ignore
            component={Link}
            to={item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </StyledListItemButton>
        </ListItem>
      ))}
    </MuiMenuList>
  );
};

export default MenuList;
