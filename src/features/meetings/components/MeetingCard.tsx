import { FC, MouseEvent, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  lighten,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

import { Meeting } from '../../../app/types.ts';
import MeetingFormModal from './MeetingFormModal.tsx';

interface MeetingCardProps {
  meeting: Meeting;
}

const MeetingCard: FC<MeetingCardProps> = ({ meeting }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          backgroundColor: lighten(theme.palette.primary.light, 0.6),
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardHeader
          avatar={<Avatar src={meeting.owner.photoUrl} />}
          title={meeting.title}
          subheader={meeting.owner.fullName}
          action={
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <Tooltip title={meeting.description} followCursor>
            <Typography
              variant="body2"
              sx={{
                height: '38px',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                lineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {meeting.description}
            </Typography>
          </Tooltip>
        </CardContent>
        <CardActions>
          <Button size="small">Подробнее</Button>
        </CardActions>
      </Card>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={1}
      >
        <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
        <MenuItem onClick={handleClose}>Удалить</MenuItem>
      </Menu>
      <MeetingFormModal
        open={openEdit}
        onClose={handleEditClose}
        defaultData={meeting}
      />
    </>
  );
};

export default MeetingCard;
