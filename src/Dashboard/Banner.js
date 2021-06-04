import React, {Fragment, useEffect , useState} from "react";
import {Button, Box} from '@material-ui/core';
import pic from "./elem.jpeg"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import SchoolIcon from '@material-ui/icons/School';
import ClassIcon from '@material-ui/icons/Class';
import PeopleIcon from '@material-ui/icons/People';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list';

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width:"100%",
      marginLeft: 70,
      marginTop: 15,
      height:600
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.4)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
    icons :{
        color: "#02075d",
        fontSize: 85,
        marginTop:25
    },
    text :{
        fontFamily: "Arial",
        color: "#02075d",
        fontSize:17,
        fontWeight: "bold"
    },
    mainTitle: {
        fontFamily: "Arial",
        fontSize:45,
        fontWeight: "bold"
    }
  }));

export default function Home() {
    const classes = useStyles();
    const[events, setEvents] = useState([]);

    const mainFeaturedPost = {
      title: 'Welcome',
      description:
        "Thomas Jefferson is an International Baccalaureate World School full of promising young students.",
      image: pic,
      imgText: 'main image description',
      linkText: 'Start your search now…',
    };

    useEffect(() => {
        fetch("http://localhost:8000/events/get")
        .then((res)=> res.json())
        .then((res)=> {
          setEvents(res);
          console.log(res)})
    }, [])

    return (
        <div style={{ overflow: 'none', margin: "0rem 0rem 12rem" }}>
            <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${mainFeaturedPost.image})` }}>
      {<img style={{ display: 'none' }} src={mainFeaturedPost.image} alt={mainFeaturedPost.imageText} />}
      <div className={classes.overlay} />

          <div className={classes.mainFeaturedPostContent}>
            <Typography className={classes.mainTitle} style={{marginTop:180}} component="h1" variant="h3" color="inherit" gutterBottom>
              {mainFeaturedPost.title}
            </Typography >
            <Typography  variant="h5" color="inherit" paragraph>
              {mainFeaturedPost.description}
            </Typography>
            {/* <Link variant="subtitle1" href="Search">
              {mainFeaturedPost.linkText}
            </Link> */}
          </div>


    </Paper>
    <div style={{display: "flex", alignItems: "center"}}>

    <Box bgcolor="#e3ecff" boxShadow={4} border={1} borderRadius={80} style={{ height:140, marginLeft:130, width:140}}>
    <Button> <Link href="AllClasses">
        <div><SchoolIcon className={classes.icons}></SchoolIcon> <Typography className={classes.text} style={{marginTop: 40}} > All Classes</Typography></div></Link></Button>
    </Box>
    <Box bgcolor="#e3ecff" boxShadow={4} border={1} borderRadius={80} style={{ height:140, marginLeft:130, width:140}}>
    <Button><Link href="ClassPage">
        <div><ClassIcon className={classes.icons}></ClassIcon> <Typography className={classes.text} style={{marginTop: 40}} > Class Page</Typography></div></Link></Button>
    </Box>
    <Box bgcolor="#e3ecff" boxShadow={4} border={1} borderRadius={80} style={{ height:140, marginLeft:130, width:140}}>
    <Button><Link href="StudentDirectory">
        <div><PeopleIcon className={classes.icons}></PeopleIcon> <Typography className={classes.text} style={{marginTop: 30}} > Student Directory</Typography></div></Link></Button>
    </Box>
    <Box bgcolor="#e3ecff" boxShadow={4} border={1} borderRadius={80} style={{ height:140, marginLeft:130, width:140}}>
    <Button><Link href="TeacherDirectory">
        <div><PermContactCalendarIcon className={classes.icons}></PermContactCalendarIcon> <Typography className={classes.text} style={{marginTop: 30}} > Teacher Directory</Typography></div></Link></Button>
    </Box>
    <Box bgcolor="#e3ecff" boxShadow={4} border={1} borderRadius={80} style={{ height:140, marginLeft:130, width:140}}>
    <Button><Link href="Calendar">
        <div><DateRangeIcon className={classes.icons}></DateRangeIcon> <Typography className={classes.text} style={{marginTop: 30}} > School Calendar</Typography></div></Link></Button>
    </Box>
    {/* <Box bgcolor="#02075D" style={{width:450, marginLeft:1000, marginBottom:100}}>
              Upcoming Schedule
          <div >
    <FullCalendar
        plugins={[ listPlugin ]}
        initialView="listWeek"
        height={250}
        handleWindowResize={true}
        events={events}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
        }}
        headerToolbar={false}
        eventBackgroundColor="#02075D"
        eventColor="#02075D"
        color="#02075D"
      /></div></Box> */}
      </div>

  </div>
    )
}
