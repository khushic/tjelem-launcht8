import React,{useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list';
import axios from "axios";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField , Box} from "@material-ui/core";
import AddEvent from "./AddEvent"
import Clock from "@material-ui/icons/Event"
import Description from "@material-ui/icons/Description"
import Location from "@material-ui/icons/LocationOn"
import DeleteEvent from "./DeleteEvent"
import EditEvent from "./EditEvent"
import { makeStyles } from '@material-ui/core/styles';
import EditButton from '@material-ui/icons/Edit'
import timeGridPlugin from '@fullcalendar/timegrid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    addbutton: {
      background: "#02075d",
      color: "white"
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
  const another = thedate.toUTCString();
  const localtime = new Date(another)
  return another
}

const changeEditState = (date, title, description, location) =>{
    if (editState === false){
        setEditState(true);
        setEditedDate(undefined);
        setEditedTitle(title);
        setEditedDescription(description);
        setEditedLocation(location)
    } else {
        // changeData(book.id)
        setEditState(false);
    }
}

// const convertTime =(time) =>{
//     const date = new Date(time *1000);
//     return date.toString();
// }


  return (
    <div style={{marginLeft:390, textAlign:"center",  alignItems:"center", justifyContent:"center", width:1300}}>
      <h2 style={{marginLeft: 800}}> {Loading()}</h2>
      <AddEvent
      setEvents={setEvents}>
      </AddEvent>
<FullCalendar 
        plugins={[ dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin ]}
        initialView="dayGridMonth"
        height={950}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }} 
        // dateClick={AddEvent}
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
      setEditState={setEditState}
      setEditedDate={setEditedDate}
      setEditedLocation={setEditedLocation}
      setEditedTitle={setEditedTitle}
      setEditedDescription={setEditedDescription}
      editedDate={editedDate}
      editedDescription={editedDescription}
      editedLocation={editedLocation}
      editedTitle={editedTitle}
      setOpen={setOpen}
      open={open}
      setEvents={setEvents}
      id={event.publicId}>
      </EditEvent> :  event !== null &&  <Dialog color fullWidth="1000xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle style={{justifyContent:"center", display:"flex"}} id="form-dialog-title"><span style={{fontWeight: 'bold', fontSize:25}}>{event.title}</span></DialogTitle>
        <DialogContent> 
          <Box border={1} borderColor="gray"> 
          <div style={{ marginLeft:30,marginRight:30}}><Clock style={{marginTop:19}}></Clock> {getDate(date.start)}</div>
          <div style={{ marginLeft:30,marginRight:30}}><Description style={{marginTop:21}}></Description> {event.extendedProps.description}</div>
  
          <div style={{ marginLeft:30,marginRight:30, marginBottom:20}}> <Location style={{marginTop:19}}></Location>{event.extendedProps.location} </div></Box>
        </DialogContent> 
        <DialogActions>
            <DeleteEvent
            setOpen={setOpen}
            setEvents={setEvents}
            id={event.publicId}></DeleteEvent>
            <Button className={classes.addbutton} color="primary"  style={{marginRight:342, marginTop:10}} onClick={()=>changeEditState(getDate(date.start), event.title, event.extendedProps.description, event.extendedProps.location)}>
              <EditButton></EditButton></Button>
          <Button className={classes.addbutton} onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>}
  
      
    </div>
  );
}
