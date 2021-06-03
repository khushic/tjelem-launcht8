import {Button } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import DeleteButton from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
    addbutton: {
      background: "#02075d",
      color: "white"
    },
  }));


export default function DeleteEvent({id,setEvents, setOpen}) {
    const classes = useStyles();

    const deleteBook = (ID)=>{
          axios.delete("http://localhost:8000/events/delete", { params: { id: ID } } )
          .then(response => {
              console.log(response);
              
          }) 
          .catch(error => {
              console.log(error)
          })
          updateData();
          updateData();
          setOpen(false);
          updateData();
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

    return(<span>
        <Button className={classes.addbutton} color="primary"  style={{marginRight:10, marginTop:10}} onClick={()=>deleteBook(id)}><DeleteButton></DeleteButton></Button>
        
    </span>
        
    )
}