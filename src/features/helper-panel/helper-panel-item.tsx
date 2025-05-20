import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'

type HelperItem = {
  id: string
  primary: string
  secondary: string
}

type Props = {
  header: string
  items: Array<HelperItem>
}

export const HelperPanelItem = ({ header, items }: Props) => (
  <Stack>
    <Typography variant="h3">{`${header}:`}</Typography>
    <List>
      {items.map(({ id, primary, secondary }) => (
        <ListItem key={id}>
          <ListItemAvatar>
            <Avatar sx={{ width: 32, height: 32 }}>
              <FolderIcon fontSize="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
      ))}
    </List>
  </Stack>
)
