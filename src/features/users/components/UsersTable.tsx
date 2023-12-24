import { FC, MouseEvent, useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';

import { Roles, User } from '../../../app/types.ts';
import {
  useApproveMutation,
  useGetUsersQuery,
} from '../../../app/services/usersApi.ts';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from '@mui/material';
import { AddTask, Clear, Delete, Done, Edit } from '@mui/icons-material';
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

  const [approve, { isLoading: isSubmitting }] = useApproveMutation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [userId, setUserId] = useState(0);

  const handleClick =
    (id: number) => (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setUserId(id);
    };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApprove = (approvedRole: Roles) => () => {
    approve({
      userId,
      approvedRole,
      isApproved: true,
    });
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
          {row.original.isApproved && (
            <Tooltip title="Подтвердить">
              <IconButton onClick={handleClick(row.original.id)}>
                <AddTask />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Редактировать">
            <IconButton>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Удалить">
            <IconButton>
              <Delete />
            </IconButton>
          </Tooltip>
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
          <MenuItem onClick={handleApprove(Roles.Admin)}>
            Администратор
          </MenuItem>
          <MenuItem onClick={handleApprove(Roles.Specialist)}>
            Специалист
          </MenuItem>
          <MenuItem onClick={handleApprove(Roles.Normal)}>Сотрудник</MenuItem>
        </Menu>
      </>
    ),
    state: {
      isLoading,
      isSaving: isSubmitting,
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
