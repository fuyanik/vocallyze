import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { collection, addDoc,setDoc,doc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 
import { db } from "../../../firebase";


export default function SelectLabels() {

  const auth = getAuth();
  const user = auth.currentUser;

  const [age, setAge] = React.useState("");

  const handleChange = (e) => {
    setAge(e.target.value);
  
    

    const cityRef = doc(db, "VitamuUsersREAL", `${user.email}`);

    setDoc(cityRef,
      { userSity: e.target.value }, 
      { merge: true }
      );
  }

  return (
    <div>
      <FormControl
        sx={{
           
         fontFamily: "'ProductSans-Light'",
          alignItems: "center",
          border: "1px solid black",
          width:"180px",
          backgroundColor: "#F0F0F0",
          borderRadius: 8,
        }}
      >
        <Select
          sx={{
            paddingLeft: "2px",
            fontFamily: "'ProductSans-Light'",
            width: "180px",
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
            <em className="select-panel-3">Choose Your City</em>
        </MenuItem>
           
            
           
          <MenuItem className="select-panel-3" value={1}>Adana</MenuItem>
          <MenuItem value={"Şanlıurfa"}>Şanlıurfa</MenuItem>
          <MenuItem value={3}>Yozgat</MenuItem>
          <MenuItem value={4}>Siirt</MenuItem>
          <MenuItem value={7}>Antep</MenuItem>
          <MenuItem value={8}>Bayrburt</MenuItem>
          
          
        </Select>
      </FormControl>
    </div>
  );
}
