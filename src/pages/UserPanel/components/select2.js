import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { setDoc,doc } from "firebase/firestore";
import {  useState } from "react";
import { getAuth } from "firebase/auth"; 
import { db } from "../../../firebase";

export default function SelectLabels2() {

  const auth = getAuth();
  const user = auth.currentUser;
  
  let remindedByUser = "";

  const [value, setValue] = useState("")

  const handleChange = async (e) => {

    setValue(e.target.value);
    remindedByUser = e.target.value;


    await setDoc(
      doc(db, "VitamuUsersREAL", `${user.email}`),
      {
        FirstRecheck: {
          remindedBy: remindedByUser
        },
       
      },
      { merge: true }
    )

  
  
  }


  const remindedBy = ["Email", "SMS", "Both"];

  return (
    <div className="select-button2">
      
      <FormControl
        sx={{
           
          color:"#142b6f",
          alignItems: "center",
          border: "1px solid #142b6f",
          width:"110px",
          backgroundColor: "white",
          borderRadius: 8,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        }}
      >
        <Select
          sx={{
            paddingLeft: "2px",
            fontFamily: "'ProductSans-Light'",
            width: "110px",
            height: "22px",
            color:"#142b6f",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: "16px",
          }}
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
           <MenuItem
            disabled value="">
            <em className="select-panel-3">Reminded by</em>
        </MenuItem>
        {remindedBy.map((reminded, index) => {
          return (
            <MenuItem value={reminded} key={index}>{reminded}</MenuItem>
          );
        })}
         
        </Select>
      </FormControl>
    </div>
  );
}
