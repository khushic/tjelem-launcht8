import {useState} from 'react';
import axios from "axios";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import Clock from "@material-ui/icons/Event"
import Description from "@material-ui/icons/Description"
import Location from "@material-ui/icons/LocationOn"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import ClockIcon from '@material-ui/icons/AccessTime'
import moment from "moment"
const useStyles = makeStyles((theme) => ({
    addbutton: {
      background: "#02075d",
      color: "white"
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
    if (time !== ""){
        let temp = newdate;
        let addon = moment(time, 'hh:mm a').format('HH:mm');
        temp += "T"
        temp += addon
        setDate(temp);
        setTime("")
    }
  const newEvent = {
    title: newtitle,
    description:  newdescription,
    location: newlocation,
    start: newdate,
    time: time
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
      <Button className={classes.addbutton} onClick={handleClickOpen} style={{marginLeft:1340, width:100}}> Add <AddCircleIcon style={{marginLeft:7}} variant="outlined"></AddCircleIcon></Button>
      <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle style={{justifyContent:"center", display:"flex"}} id="form-dialog-title">Add Event</DialogTitle>
        <DialogContent>
          <div style={{ marginLeft:30,marginRight:40}}> Title: <TextField  style={{width:350}}  onChange={handleChange('title')}/></div>
          <div style={{ marginLeft:30,marginRight:30}}><Clock style={{marginTop:19}}></Clock> <TextField style={{marginLeft:15}} label="YYYY-MM-DD"  onChange={handleChange('date')}/>
          <ClockIcon style={{marginLeft:10}}></ClockIcon><TextField style={{marginLeft:10, width:130}} label="HH:MM am/pm"  onChange={handleChange('time')}/></div>
          <div style={{ marginLeft:30,marginRight:30}}><Description style={{marginTop:19}}></Description> <TextField style={{marginLeft:15, width:341}} label="Description" onChange={handleChange('description')}/></div>
          <div style={{ marginLeft:30,marginRight:30}}> <Location style={{marginTop:19}}></Location> <TextField label="Location" style={{marginLeft:15, width: 341}} onChange={handleChange('location')}/></div>
        </DialogContent>
        <DialogActions>
   
          <Button className={classes.addbutton} style={{marginRight:300, marginBottom:10, marginTop:10, marginLeft:10}} onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button className={classes.addbutton} style={{marginRight:10}} onClick={addEvent} color="primary">
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
