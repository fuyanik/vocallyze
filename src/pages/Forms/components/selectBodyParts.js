import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 58;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 270,
      marginTop: 10,
    }
  }
};

const names = [
 "Brain/Head",
 "Lumbar Spine",
 "Knee - Right",
  "Knee - Left",
  "Shoulder - Right",
  "Shoulder - Left",
  "Cervical Spine",
  "Thoracic Spine",
  "Lumbar Spine",
  "Hip - Right",
  "Hip - Left",
  "Elbow - Right",
  "Elbow - Left",
  "Wrist - Right",
  "Wrist - Left",
  "Ankle - Right",
  "Ankle - Left",
  "Foot - Right",
  "Foot - Left",
  "Hand - Right",
  "Hand - Left",
  "Chest",
  "Abdomen",
  "Pelvis",
  "Neck",
  "Shoulder",
  "Arm",
  "Forearm",
  "Wrist",
  "Hand",
  "Thigh",
  "Knee",
  "Lower Leg",
  "Ankle",
  "Foot",
  "Spine",
 
  "Lumbar Spine",
  "Sacrum",
  "Coccyx",
  "Hip",

];

function getStyles(name, personName, theme) {
  return {
   

    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function SelectBodyParts() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: 320, height:50, backgroundColor:"white", border:"2px solid #142b6f", borderRadius:"30px" }}>
        <InputLabel sx={{ paddingBottom:20}} >
           <p className="font-product bg-white text-[#142b6f] relative  bottom-1 font-bold">Body Part-s</p>
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
