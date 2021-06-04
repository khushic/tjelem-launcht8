import {useState} from 'react';
import axios from "axios";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import Clock from "@material-ui/icons/Event"
import Description from "@material-ui/icons/Description"
import Location from "@material-ui/icons/LocationOn"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import ClockIcon from '@material-ui/icons/AccessTime'
import Close from "@material-ui/icons/Close"
import moment from "moment"
const useStyles = makeStyles((theme) => ({
    addbutton: {
      background: "#ECD100",
      color: "white",
      fontWeight: "bold",
    },
    addbutton2: {
      background: "#ECD100",
      color: "white",
      borderRadius: 20,
      boxShadow: 10,
    },
  }));
  
export default function AddEvent({setEvents}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newtitle, setTitle] = useState("");
  const [newdate, setDate] = useState("");
  const [newdescription, setDescription] = useState("");
  const [newlocation, setLocation] = useState("");
  const [time, setTime] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



const updateData = () =>{
    fetch("http://localhost:8000/events/get")
        .then((res)=> res.json())
        .then((res)=> {
          setEvents(res);
          console.log(res)
        }
        )
}


const addEvent = () =>{
  let temp = newdate;
    if (time !== ""){
        temp += "T"
        temp += time
        setTime("")
    }
  const converted = moment(time, 'HH:mm').format('hh:mm a');
  const newEvent = {
    title: newtitle,
    description:  newdescription,
    location: newlocation,
    start: temp,
    time: converted,
    displaydate: newdate
  }
  axios.post("http://localhost:8000/events/add", newEvent)
  .then(response => {
      console.log(response);
  }) 
  .catch(error => {
      console.log(error)
  })
  updateData();
  updateData();
  handleClose();
} 
const handleChange = (prop) => (e) =>{
    if ('title' === prop){
      setTitle(e.target.value)
    }
    if ('date' === prop){
        setDate(e.target.value)
      }
      if ('description' === prop){
        setDescription(e.target.value)
      }
      if ('location' === prop){
        setLocation(e.target.value)
      }
      if ('time' === prop){
        setTime(e.target.value)
      }
}

  return (
    <div style={{ marginRight:250}}>
      <Button className={classes.addbutton2} onClick={handleClickOpen} style={{marginLeft:1340, width:100}}> Add <AddCircleIcon style={{marginLeft:7}} variant="outlined"></AddCircleIcon></Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"> 
        <DialogTitle style={{ display:"flex"}} id="form-dialog-title"><span style={{fontSize:30, marginLeft:180,fontWeight:"bold", fontFamily: "Poppins"}}>Add Event</span><Button style={{marginLeft:125}} onClick={handleClose} color="primary">
            <Close></Close>
          </Button></DialogTitle>
        <DialogContent>
          <div style={{ marginLeft:30,marginRight:40}}> <h2 style={{fontWeight: "normal", fontSize:21}}>Title</h2> <TextField  style={{width:435, marginTop:20}}  onChange={handleChange('title')}/></div>
          <div style={{ marginLeft:30,marginRight:30}}><h2 style={{fontWeight: "normal", fontSize:21, marginTop:30}}>Date and Time</h2> <TextField style={{ width:435, marginTop:9}} type="date"  onChange={handleChange('date')}/>
          <div><TextField style={{ width:150, marginTop:19}} type="time" onChange={handleChange('time')}/></div></div>
          <div style={{ marginLeft:30,marginRight:30}}><h2 style={{fontWeight: "normal", fontSize:21, marginTop:30}}> Description</h2>  <TextField style={{ width:435}}  onChange={handleChange('description')}/></div>
          <div style={{ marginLeft:30,marginRight:30}}><h2 style={{fontWeight: "normal", fontSize:21, marginTop:30}}>Location</h2>   <TextField  style={{width: 435}} onChange={handleChange('location')}/></div>
        </DialogContent>
        <DialogActions>
   
          <Button className={classes.addbutton} style={{marginRight:18, width:500, marginTop:18,marginBottom:10}} onClick={addEvent} color="primary">
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
