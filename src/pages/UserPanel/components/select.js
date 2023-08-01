import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {setDoc,doc } from "firebase/firestore";
import {  useState } from "react";
import { getAuth } from "firebase/auth"; 
import { db } from "../../../firebase";

export default function SelectLabels() {
  
  let remindDay = 1;
  const[value,setValue] = useState(1);

  const auth = getAuth();
  const user = auth.currentUser;


  const handleChange = async (e) => {
        setValue(e.target.value);
        remindDay = e.target.value;
        console.log(remindDay)
    

     await setDoc(
      doc(db, "VitamuUsersREAL", `${user.email}`),
      {
        FirstRecheck: {
          remindDay: remindDay
          
        },
       
      },
      { merge: true }
    )


   
  }

  const days = [];

  for (let i = 1; i < 32; i++) {

      days.push( <MenuItem value={i}>{i}</MenuItem>);
  
    }


    
  return (
    <div className="select-button1">
     

      <FormControl
        sx={{

          alignItems: "center",
          border: "1px solid #000000",
          width:"70px", 
          backgroundColor: "white",
          borderRadius: 8,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"

        }}
      >
        <Select
          sx={{
            paddingTop: "1.5px",
            fontFamily: "'ProductSans-Light'",
            width: "70px",
            height: "22px",
            color: "#000000",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: "15.7px",
            
            

          }}
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
         
         
<MenuItem
style={{width:"180px"}}
            disabled value="">
            <em className="select-panel-3">Remind  me  day</em>
        </MenuItem>

        {days}
       
     
      

         
          
          
        </Select>
      </FormControl>
    </div>
  );
}
