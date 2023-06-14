import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { setDoc,doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";

export default function SelectLabels() {
  const auth = getAuth();
  const user = auth.currentUser;

  let userCountry = "";
  const [age, setAge] = React.useState("");

  const handleChange = (e) => {
    setAge(e.target.value);
    userCountry = e.target.value;
    
    console.log(userCountry)

    const cityRef = doc(db, "VitamuUsersREAL", `${user.email}`);

    setDoc(cityRef,
      { userCountry: userCountry}, 
      { merge: true }
      );


  }

  const Countries = ["United States","Canada","United Kingdom","Australia"];
  return (
    <div>
      <FormControl
        sx={{
           
         fontFamily: "'ProductSans-Light'",
          alignItems: "center",
          border: "1px solid black",
          width:"220px",
          backgroundColor: "#F0F0F0",
          borderRadius: 8,
        }}
      >
        <Select
          sx={{
            paddingLeft: "2px",
            fontFamily: "'ProductSans-Light'",
            width: "220px",
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
            <em className="select-panel-3">Choose Your Country</em>
        </MenuItem>
           
            
           
          {Countries.map((country, index) => {
            return (
              <MenuItem value={country} key={index}>{country}</MenuItem>
            );
          } )}
          
          
        </Select>
      </FormControl>
    </div>
  );
}
