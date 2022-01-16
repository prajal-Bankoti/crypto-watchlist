import "./stock.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
export function Card({value,formet,setsort,sort}) {
  
  return (
    <div>
      <div style={{display:value?"block":"none"}} className="card">
        <div>Sort</div>
        <div style={{ marginBottom: "30px" }} className="card-1">
          <div onClick={()=>{
              setsort(!sort)
          }}>A-Z</div>
        </div>
        <div id="radio">
          <FormControl component="fieldset">
            <FormLabel component="legend">Formet</FormLabel>
            <RadioGroup
              aria-label="gender"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Percentage"
                onClick={()=>{
                   formet(false)
                }}
                control={<Radio />}
                label="Percentage"
              />
              <FormControlLabel
                value="Absolute"
                onClick={()=>{
                 formet(true)
                }}
                control={<Radio />}
                label="Absolute"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
