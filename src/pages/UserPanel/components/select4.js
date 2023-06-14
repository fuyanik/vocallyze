import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { setDoc,doc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 
import { db } from "../../../firebase";


export default function SelectLabels() {

   
  const auth = getAuth();
  const user = auth.currentUser;

  let userState = ""
  const [age, setAge] = React.useState("");

  const handleChange = (e) => {
    setAge(e.target.value);
   
    userState = e.target.value;

    const cityRef = doc(db, "VitamuUsersREAL", `${user.email}`);

    setDoc(cityRef,
      { userState: e.target.value }, 
      { merge: true }
      );
  
  }




  let UsStates = [ "AK - Alaska", 
                "AL - Alabama", 
                "AR - Arkansas", 
                "AS - American Samoa", 
                "AZ - Arizona", 
                "CA - California", 
                "CO - Colorado", 
                "CT - Connecticut", 
                "DC - District of Columbia", 
                "DE - Delaware", 
                "FL - Florida", 
                "GA - Georgia", 
                "GU - Guam", 
                "HI - Hawaii", 
                "IA - Iowa", 
                "ID - Idaho", 
                "IL - Illinois", 
                "IN - Indiana", 
                "KS - Kansas", 
                "KY - Kentucky", 
                "LA - Louisiana", 
                "MA - Massachusetts", 
                "MD - Maryland", 
                "ME - Maine", 
                "MI - Michigan", 
                "MN - Minnesota", 
                "MO - Missouri", 
                "MS - Mississippi", 
                "MT - Montana", 
                "NC - North Carolina", 
                "ND - North Dakota", 
                "NE - Nebraska", 
                "NH - New Hampshire", 
                "NJ - New Jersey", 
                "NM - New Mexico", 
                "NV - Nevada", 
                "NY - New York", 
                "OH - Ohio", 
                "OK - Oklahoma", 
                "OR - Oregon", 
                "PA - Pennsylvania", 
                "PR - Puerto Rico", 
                "RI - Rhode Island", 
                "SC - South Carolina", 
                "SD - South Dakota", 
                "TN - Tennessee", 
                "TX - Texas", 
                "UT - Utah", 
                "VA - Virginia", 
                "VI - Virgin Islands", 
                "VT - Vermont", 
                "WA - Washington", 
                "WI - Wisconsin", 
                "WV - West Virginia", 
                "WY - Wyoming"]

  return (
    <div>
      <FormControl
        sx={{
           
         fontFamily: "'ProductSans-Light'",
          alignItems: "center",
          border: "1px solid black",
          width:"250px",
          backgroundColor: "#F0F0F0",
          borderRadius: 8,
        }}
      >
        <Select
          sx={{
            paddingLeft: "2px",
            fontFamily: "'ProductSans-Light'",
            width: "250px",
            height: "27px",
            color: "black",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: "16px",
          }}
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
        <MenuItem
            disabled value="">
            <em className="select-panel-3">Choose the state (US Only)</em>
        </MenuItem>
           
            
           
          {UsStates.map((state, index) => {
            return (
              <MenuItem value={state} key={index}>{state}</MenuItem>
            );
          } )}
          
          
        </Select>
      </FormControl>
    </div>
  );
}
