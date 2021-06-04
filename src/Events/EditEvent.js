import axios from "axios";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField , Box, Divider} from "@material-ui/core";
import Clock from "@material-ui/icons/Event"
import Description from "@material-ui/icons/Description"
import Location from "@material-ui/icons/LocationOn"
import { makeStyles } from '@material-ui/core/styles';
import ClockIcon from '@material-ui/icons/AccessTime'
import moment from "moment"
import Close from "@material-ui/icons/Close"

const useStyles = makeStyles((theme) => ({
    addbutton: {
      background: "#02075d",
      color: "white"
    },
  }));



 export default function EditEvent({setEditedTime, editedTime, setEditState, setEditedDate, setEditedDescription, setEditedLocation, setEditedTitle, id,setEvents, setOpen, open, editedDate, editedTitle, editedDescription, editedLocation}){
    const classes = useStyles();
    const handleClose = () => {
        setOpen(false);
        setEditState(false)
      };

      const changeData = (ID)=> {
        let temp = editedDate;
        if (editedTime !== "All Day"){
            const addon = moment(editedTime, 'hh:mm a').format('HH:mm');
            console.log(addon)
            temp+= "T"
            temp+= addon
            setEditedTime("")
        }
        console.log(temp)
        const updated = {
          id: ID,
          title: editedTitle,
          start: temp,
          description: editedDescription,
          location: editedLocation,
          time: editedTime,
          displaydate: editedDate
      }
      axios.put("http://localhost:8000/events/edit", updated)
      .then(response => {
          console.log(response);
      }) 
      .catch(error => {
          console.log(error)
      })
      updateData();
      updateData();
     // handleClose();
      updateData();
      handleClose()
      }

      const updateData = () =>{
        fetch("http://localhost:8000/events/get")
            .then((res)=> res.json())
            .then((res)=> {
              setEvents(res);
              console.log(res)
            }
            )
    }

    const handleChange = (prop) => (e) =>{
        if ('title' === prop){
          setEditedTitle(e.target.value)
        }
        if ('date' === prop){
            setEditedDate(e.target.value)
          }
          if ('description' === prop){
            setEditedDescription(e.target.value)
          }
          if ('location' === prop){
            setEditedLocation(e.target.value)
          }
          if ('time' === prop){
            setEditedTime(e.target.value)
          }
    }
    // const convertTime = (convert)=>{
    //     console.log(moment('hh:mm a').format("13:00", 'HH:mm'));
    // }
     return (
         <div>
             <Dialog style={{width:630, justifyContent:"center", alignItems:"center" ,marginLeft:650}}  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle style={{display:"flex"}} id="form-dialog-title"><span ><h2 style={{marginLeft:200, fontWeight: 'bold', fontSize:28, marginTop:9}}>Edit Event <Button  style={{marginLeft:100}} onClick={handleClose} color="primary">
            <Close></Close>
          </Button></h2></span>
          </DialogTitle>
        <DialogContent> 
        <div style={{ marginLeft:30}}><h2 style={{fontWeight: "normal", fontSize:21}}>Title</h2>
          <TextField style={{width:450}}  onChange={handleChange('title')} value={editedTitle}></TextField></div>
          <div style={{ marginLeft:30}}><h2 style={{fontWeight: "normal", fontSize:21, marginTop:40}}>Date and Time</h2> <Clock style={{ marginRight:7, marginTop:20}}></Clock>
          <TextField style={{width:200}} label="Date (YYYY-MM-DD" onChange={handleChange('date')} value={editedDate}></TextField>
          <ClockIcon style={{marginLeft:10}}></ClockIcon><TextField style={{marginLeft:10, width:155}} label="HH:MM am/pm"  onChange={handleChange('time')} value={editedTime}/></div>
          <div style={{ marginTop:10, marginLeft:30}}><h2 style={{fontWeight: "normal", fontSize:21, marginTop:40}}>Description</h2><Description style={{marginTop:6, marginRight:7}}></Description> 
          <TextField multiline rowsMax={2} style={{width:420}}  onChange={handleChange('description')} value={editedDescription}></TextField></div>
          <div style={{ marginLeft:30, marginBottom:20}}><h2 style={{fontWeight: "normal", fontSize:21, marginTop:40}}>Location</h2> <Location style={{marginTop:6, marginRight:7}}></Location>
          <TextField style={{width:430}} onChange={handleChange('location')} value={editedLocation}></TextField></div>
        </DialogContent> 
        <DialogActions>
            
            <Button className={classes.addbutton} style={{marginRight:10, width:520, marginBottom:10}} color="primary" onClick={()=>changeData(id)}>Edit event</Button>
        </DialogActions>
      </Dialog>
         </div>
     )
 }