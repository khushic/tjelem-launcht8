import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SchoolIcon from '@material-ui/icons/School';
import ClassIcon from '@material-ui/icons/Class';
import PeopleIcon from '@material-ui/icons/People';
import DateRangeIcon from '@material-ui/icons/DateRange';
import HomeIcon from '@material-ui/icons/Home';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { Link } from "react-router-dom";
import TJlogo from "./TJlogo.png"
import grey from '@material-ui/core/colors/grey';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: "#02075d",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    background: "#02075d",
    color: "white"
  },
  drawerOpen: {
    width: drawerWidth,
    background: "#02075d",
    color: "white",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "#02075d",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('Dashboard');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const onItemClick = title => () => {
    setTitle(title);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
              {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
      color="blue"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: grey[50] }}/> : <ChevronLeftIcon style={{ color: grey[50] }}/>}
          </IconButton>
        </div>
        {open ? <img style={{width:175, marginLeft:30, marginBottom: 25}} src={TJlogo}></img> : ""}
        <Divider />
        <List>
            <ListItem onClick={onItemClick('Dashboard')} button component={Link} to="/" button key="Dashboard"><ListItemIcon><HomeIcon style={{ color: grey[50] }}/></ListItemIcon><ListItemText primary="Dashboard"></ListItemText></ListItem>
            <ListItem onClick={onItemClick('All Classes')} button component={Link} to="/AllClasses" button key="all Classes"><ListItemIcon><SchoolIcon style={{ color: grey[50] }}/></ListItemIcon><ListItemText primary="All Classes"></ListItemText></ListItem>
            <ListItem onClick={onItemClick('Class Page')} button component={Link} to="/ClassPage" button key="Class Page"><ListItemIcon><ClassIcon style={{ color: grey[50] }}/></ListItemIcon><ListItemText primary="Class Page"></ListItemText></ListItem>
            <ListItem onClick={onItemClick('Student Directory')} button component={Link} to="/StudentDirectory" button key="Student Directory"><ListItemIcon><PeopleIcon style={{ color: grey[50] }}/></ListItemIcon><ListItemText primary="Student Directory"></ListItemText></ListItem>
            <ListItem onClick={onItemClick('Teacher Directory')} button component={Link} to="/TeacherDirectory" button key="Teacher Directory"><ListItemIcon><PermContactCalendarIcon style={{ color: grey[50] }}/></ListItemIcon><ListItemText primary="Teacher Directory"></ListItemText></ListItem>
            <ListItem onClick={onItemClick('School Calendar')} button component={Link} to="/Calendar" button key="School Calendar"><ListItemIcon><DateRangeIcon style={{ color: grey[50] }}/></ListItemIcon><ListItemText primary="School Calendar"></ListItemText></ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}