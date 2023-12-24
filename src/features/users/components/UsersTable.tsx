import { FC, MouseEvent, useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';

import { User } from '../../../app/types.ts';
import { useGetUsersQuery } from '../../../app/services/usersApi.ts';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from '@mui/material';
import { AddTask, Clear, Done } from '@mui/icons-material';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

const columns: MRT_ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 80,
  },
  {
    accessorKey: 'name',
    header: 'Имя',
  },
  {
    accessorKey: 'surname',
    header: 'Фамилия',
  },
  {
    accessorKey: 'email',
    header: 'email',
  },
  {
    accessorKey: 'role',
    header: 'Роль',
  },
  {
    accessorKey: 'isApproved',
    header: 'Подтвержден',
    // eslint-disable-next-line react/prop-types
    Cell: ({ row }) => (row.original.isApproved ? <Done /> : <Clear />),
  },
];

const UsersTable: FC = () => {
  const { data, isLoading } = useGetUsersQuery(null);

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const table = useMaterialReactTable({
    data: data || [],
    columns,
    enableRowActions: true,
    enableFullScreenToggle: false,
    localization: MRT_Localization_RU,
    renderRowActions: ({ row }) => (
      <>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          {row.original.isApproved ? (
            <>-</>
          ) : (
            <Tooltip title="Подтвердить">
              <IconButton onClick={handleClick}>
                <AddTask />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
          elevation={1}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Администратор</MenuItem>
          <MenuItem onClick={handleClose}>Специалист</MenuItem>
          <MenuItem onClick={handleClose}>Сотрудник</MenuItem>
        </Menu>
      </>
    ),
    state: {
      isLoading,
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '15px',
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default UsersTable;
