import React,{useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle , Box, Divider, Typography} from "@material-ui/core";
import AddEvent from "./AddEvent"
import Clock from "@material-ui/icons/Event"
import Description from "@material-ui/icons/Description"
import Location from "@material-ui/icons/LocationOn"
import DeleteEvent from "./DeleteEvent"
import EditEvent from "./EditEvent"
import { makeStyles } from '@material-ui/core/styles';
import EditButton from '@material-ui/icons/Edit'
import timeGridPlugin from '@fullcalendar/timegrid';

const useStyles = makeStyles((theme) => ({
    addbutton: {
      background: "#02075d",
      color: "white"
    },
    root: {
      color: "yellow",
      margin: 0,
      padding: theme.spacing(3)
    },
  }));

export default function Library() {
  const classes = useStyles();
  const[events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editState ,setEditState] =useState(false)
  const [event, setEvent] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedTime, setEditedTime] = useState("");
  const [date, setDate] = useState('');


  const toggle = (e) =>{
      console.log(e)
      setOpen(!open);
      setEvent(e.event._def);
      setDate(e.event._instance.range)
  }

  const handleClose = () => {
    setOpen(false);
  };
  const Loading = () =>{
    if (events.length === 0) {
        fetch("http://localhost:8000/events/get")
        .then((res)=> res.json())
        .then((res)=> {
          setEvents(res);
          console.log(res)
        }
        )
  }
}
const getDate = (format) =>{
  const thedate = new Date(format);
  const relevant = thedate.toUTCString();
  return relevant.slice(0,17)
}

const changeEditState = (date, title, description, location) =>{
    if (editState === false){
        setEditState(true);
        setEditedDate(undefined);
        setEditedTitle(title);
        setEditedDescription(description);
        setEditedLocation(location)
    } else {
    
        setEditState(false);
    }
}
const time = (each) =>{
  if (each.extendedProps.time === ""){
    return "All Day"
  } 
  if (each.extendedProps.time !== undefined){
    return each.extendedProps.time
  } 
  return "All Day"
}


  return (
    <div style={{marginLeft:390, marginBottom:100, textAlign:"center",  alignItems:"center", justifyContent:"center", width:1300}}>
      <h2 style={{marginLeft: 800}}> {Loading()}</h2>
      <AddEvent
      setEvents={setEvents}>
      </AddEvent>
<FullCalendar 
        plugins={[ dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin ]}
        initialView="dayGridMonth"
        height={970}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        handleWindowResize={true}
        aspectRatio={1.35}
        selectable={true}
        editable={true}
        events={events}
        eventClick={toggle}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
        }}
        eventBackgroundColor="#02075D"
        eventColor="#02075D"
        displayEventTime={false}
        color="#02075D"
        eventDisplay="block"
        eventWidth= "100%"
        eventHeight= "100px"
        fontSize={20}
        theme={true}
      />

      { editState ? event !== null &&  
      <EditEvent
      setEditedTime={setEditedTime}
      setEditState={setEditState}
      setEditedDate={setEditedDate}
      setEditedLocation={setEditedLocation}
      setEditedTitle={setEditedTitle}
      setEditedDescription={setEditedDescription}
      editedTime={editedTime}
      editedDate={editedDate}
      editedDescription={editedDescription}
      editedLocation={editedLocation}
      editedTitle={editedTitle}
      setOpen={setOpen}
      open={open}
      setEvents={setEvents}
      id={event.publicId}>
      </EditEvent> :  event !== null &&  <Dialog className={classes.root}  color fullWidth="1000xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle style={{justifyContent:"center", display:"flex"}} id="form-dialog-title"><span style={{fontWeight: 'bold', fontSize:25}}>{event.title}</span></DialogTitle>
        <DialogContent> 
          <Box border={1} borderColor="#778899"> 
          <div style={{ marginLeft:30,marginRight:30}}>
            <h2>Date and Time</h2> <Clock style={{ marginLeft:20}}></Clock><span style={{fontSize:17, marginLeft:12}}>{getDate(date.start)}- {time(event)}</span></div>
            <Divider style={{marginTop:10}}></Divider>
          <div style={{ marginLeft:30,marginRight:30}}>
          <h2>Description</h2>
          <span style={{alignItems:"flex-end"}}><Description style={{ marginLeft:20}}></Description> <span style={{fontSize:17, marginLeft:10}}>{event.extendedProps.description}</span></span></div>
          <Divider style={{marginTop:10}}></Divider>
          <div style={{ marginLeft:30,marginRight:30, marginBottom:20}}> <h2>Location</h2><Location style={{marginLeft:20}}></Location> <span style={{fontSize:17, marginLeft:10}}>{event.extendedProps.location} </span></div></Box>
        </DialogContent> 
        <DialogActions>
        <Button style={{marginRight:340}} className={classes.addbutton} onClick={handleClose} color="primary">
            Cancel
          </Button>
            <DeleteEvent
            setOpen={setOpen}
            setEvents={setEvents}
            id={event.publicId}></DeleteEvent>
            <Button className={classes.addbutton} color="primary"  style={{marginTop:10, marginBottom:10, marginRight:10}} onClick={()=>changeEditState(getDate(date.start), event.title, event.extendedProps.description, event.extendedProps.location)}>
              <EditButton></EditButton></Button>
    
        </DialogActions>
      </Dialog>}
  
      
    </div>
  );
}
