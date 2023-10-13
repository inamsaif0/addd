import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import axios from 'axios';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import { useRouter } from 'next/router'
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ContentPasteGoOutlinedIcon from '@mui/icons-material/ContentPasteGoOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';

const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const router = useRouter()

  const [open, setOpen] = React.useState(false);
  const [colopen, setColopen] = React.useState(false);
  const [col, setCol] = React.useState(false);


  const [iopen, setiOpen] = React.useState(true);
  const handleClick = () => {
    setiOpen(!iopen);

  };
  const handleCollapeOpen = () => {
    if (colopen == false)
      setColopen(true);
    else
      setColopen(false)
  }
  const handleOtherCollapeOpen = () => {
    if (col == false)
      setCol(true);
    else
      setCol(false)
  }
  const handleDrawerOpen = () => {
    if (open == false)
      setOpen(true);
    else
      setOpen(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = async () => {
    const response = await axios.get('http://localhost:3000/api/logout')
    if (response.data.success) router.push('/')
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ background: '#5c0931' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            OTP
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
            </ListSubheader>

          }
        >

          <ListItem key="dashboard" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={handleClick}
              href='/Dashboard'
            >
              <ListItemIcon
                onClick={handleDrawerOpen}
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',

                }}
              >
                <DashboardIcon sx={{ color: '#5c0931' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />

            </ListItemButton>
          </ListItem>

        </List>
        <Divider />


        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
            </ListSubheader>

          }
        >

          <ListItem key="Users" disablePadding sx={{ display: 'block' }} >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={handleCollapeOpen}
            >
              <ListItemIcon
                onClick={handleDrawerOpen}
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >

                <PeopleOutlinedIcon sx={{ color: '#5c0931' }} />
                
              </ListItemIcon>
              <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />

            </ListItemButton>
            <Collapse in={colopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

                <ListItemButton sx={{ pl: 4 }} href='/users/userList'>
                  <ListItemIcon>
                    <ClearAllOutlinedIcon sx={{ color: '#5c0931' }} />
                  </ListItemIcon>
                  <ListItemText primary="User List" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }} href='/users/createUser'>
                  <ListItemIcon>
                  <GroupAddIcon sx={{color: '#5c0931'}} />
                  </ListItemIcon>
                  <ListItemText primary="Create User" />
                </ListItemButton>

              </List>
            </Collapse>
          </ListItem>

        </List>
        <Divider />

        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
            </ListSubheader>

          }
        >

          <ListItem key="Users" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={handleOtherCollapeOpen}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >

                < ContentPasteGoOutlinedIcon sx={{ color: '#5c0931' }} />
              </ListItemIcon>
              <ListItemText primary="Notes" sx={{ opacity: open ? 1 : 0 }} />

            </ListItemButton>
            <Collapse in={col} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} href='/content/contentList'>
                  <ListItemIcon>
                    <ChecklistOutlinedIcon sx={{ color: '#5c0931' }} />
                  </ListItemIcon>
                  <ListItemText primary="List" />

                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} href='/content/uploadFiles'>

                  <ListItemIcon>
                    <FileOpenIcon sx={{ color: '#5c0931' }} />
                  </ListItemIcon>
                  <ListItemText primary="Add Files" />

                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>

        </List>
        <Divider />

        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
            </ListSubheader>

          }
        >

          <ListItem key="Log Out" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={logout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon sx={{ color: '#5c0931' }} />
              </ListItemIcon>
              <ListItemText primary="Log Out" sx={{ opacity: open ? 1 : 0 }} />

            </ListItemButton>

          </ListItem>

        </List>
        <Divider />

      </Drawer>
      {/* <Main open={open}><DrawerHeader /><Typography variant='h1' sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>OTP</Typography></Main> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

      </Box>
    </Box>
  );
}
