import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import PlaceIcon from "@mui/icons-material/Place";
import "./SearchBox.css";
import { useState } from "react";

function SearchBox({ weatInfo }) {
  let [city, setCity] = useState("");
  let [err, setErr] = useState(false);
  let [open, setOpen] = useState(true);

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_URL}?q=${city}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      );
      let jsonRes = await response.json();
      let result = {
        city: city,
        temp: jsonRes.main.temp,
        tempMin: jsonRes.main.temp_min,
        tempMax: jsonRes.main.temp_max,
        humidity: jsonRes.main.humidity,
        feelsLike: jsonRes.main.feels_like,
        weather: jsonRes.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(city);
      setCity("");
      let newInfo = await getWeatherInfo();
      weatInfo(newInfo);
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="City Name"
          variant="standard"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          SEARCH
        </Button>
        {err && (
          <Box className="alert" sx={{ width: "100%" }}>
            <Collapse in={open}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                <b>
                  <PlaceIcon /> &nbsp; NO SUCH PLACE EXISTS !
                </b>
                !
              </Alert>
            </Collapse>
          </Box>
        )}
      </form>
    </div>
  );
}
export default SearchBox;
