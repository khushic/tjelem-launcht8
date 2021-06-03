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
        if (editedTime !== ""){
            const addon = moment(editedTime, 'hh:mm a').format('HH:mm');
            console.log(addon)
            const temp = editedDate + "T" + addon
            setEditedDate(temp);
            console.log(editedDate)
            setEditedTime("")
        }
        const updated = {
          id: ID,
          title: editedTitle,
          start: editedDate,
          description: editedDescription,
          location: editedLocation,
          time: editedTime
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
             <Dialog fullWidth="1000xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle style={{display:"flex"}} id="form-dialog-title"><span style={{fontWeight: 'bold', fontSize:16}}><h2 style={{marginLeft:200}}>Edit Event <Button  style={{marginLeft:160}} onClick={handleClose} color="primary">
            <Close></Close>
          </Button></h2></span>

          </DialogTitle>
        <DialogContent> 
        <div style={{ marginLeft:30,marginRight:30}}><h2 style={{fontWeight: "normal"}}>Title</h2>
          <TextField style={{width:400}}  onChange={handleChange('title')} value={editedTitle}></TextField></div>
          <div style={{ marginLeft:30,marginRight:30}}><h2 style={{fontWeight: "normal"}}>Date and Time</h2> <Clock style={{ marginRight:7, marginTop:20}}></Clock>
          <TextField style={{width:200}} label="Date (YYYY-MM-DD)" onChange={handleChange('date')} value={editedDate}></TextField>
          <ClockIcon style={{marginLeft:10}}></ClockIcon><TextField style={{marginLeft:10, width:155}} label="HH:MM am/pm"  onChange={handleChange('time')}/></div>
          <div style={{ marginTop:10, marginLeft:30,marginRight:30}}><h2 style={{fontWeight: "normal"}}>Description</h2><Description style={{marginTop:6, marginRight:7}}></Description> 
          <TextField multiline rowsMax={2} style={{width:400}}  onChange={handleChange('description')} value={editedDescription}></TextField></div>
          <div style={{ marginLeft:30,marginRight:30, marginBottom:20}}><h2 style={{fontWeight: "normal"}}>Location</h2> <Location style={{marginTop:6, marginRight:7}}></Location>
          <TextField style={{width:400}} onChange={handleChange('location')} value={editedLocation}></TextField></div>
        </DialogContent> 
        <DialogActions>
            
            <Button className={classes.addbutton} style={{marginRight:20, width:550, marginBottom:10}} color="primary" onClick={()=>changeData(id)}>Edit event</Button>
        </DialogActions>
      </Dialog>
         </div>
     )
 }