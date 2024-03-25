import React, {useEffect, useState} from 'react';
import axios from 'axios'
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import {Button, Grid, Typography, Input, CircularProgress } from '@mui/material'
import '../WhetherForCast/index.css'


// const useStyles = makeStyles(() => ({
//   main: {
//     color: "#EB6E4B",
//   },
// }));

const WeatherForCast = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loader, setLoader] = useState(false)

    // const classes = useStyles();

  const fetchData = async () => {
    setLoader(true)
    try {
      const response1 = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&units=metric&appid=7fc2842f3d3ebd026930df080bb7ad5b`
      );
      const response2 = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${response1.data[0].lat}&lon=${response1.data[0].lon}&limit=5&appid=7fc2842f3d3ebd026930df080bb7ad5b`
      );
      setWeatherData(response2.data);
      setLoader(false)
    } catch (error) {
      console.error(error);
      setLoader(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

    return (
      <Grid container direction="row" className="parentClass">
        <Grid item xs={12} md={6}>
          <Typography variant="h3" className="main">
            {" "}
            Weather in Your City{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              variant="outlined"
              placeholder="Enter city name"
              value={city}
              onChange={handleInputChange}
              className='input'
            />
            <Button variant="outlined" type="submit" className='buttonStyles main'>
              {" "}
              <HelpOutlinedIcon className='main'/> <Typography className='main'>Search </Typography> 
            </Button>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row">
            {weatherData ? (
              weatherData.list.slice(0, 5).map((item, index) => {
                return (
                  <Grid item className="eachCard">
                    <div className="eachCardStyles">
                      <Typography variant="h6" className="boxStyles firstBox">
                        {" "}
                        Date : {item.dt_txt.split(" ")[0]}
                      </Typography>
                      <Typography variant="h6" className="boxStyles otherBoxes">
                        {" "}
                        Temperature
                      </Typography>
                      <table>
                        <tr className='otherBoxes'>
                          <th>Min</th>
                          <th>Max</th>
                        </tr>
                        <tr className='otherBoxes'>
                          <td>{item.main.temp_max} C</td>
                          <td>{item.main.temp_min} C</td>
                        </tr>
                        <tr>
                          <td>Humidity</td>
                          <td>{item.main.humidity}%</td>
                        </tr>
                        <tr>
                          <td>Pressure</td>
                          <td>{item.main.pressure}</td>
                        </tr>
                      </table>
                    </div>
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12}>
                {loader ? <CircularProgress color="inherit"/> : "Please search the city"}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
}

export default WeatherForCast;