import React, {useState} from 'react';
import axios from 'axios'
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import {Button, Grid, Typography, CircularProgress } from '@mui/material'
import TextField from '@mui/material/TextField';
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

    const groupByDays = (data) => {
        return (data.reduce((list, item) => {
          const forecastDate = item.dt_txt.split(' ')[0];
          list[forecastDate] = list[forecastDate] || [];
          list[forecastDate].push(item);
          return list;
        }, {}))
      }

      const getInfo = (data, min=[], max=[], humidity=[], pressure=[]) => {
        data.map(item => {
          max.push(item.main.temp_max);
          min.push(item.main.temp_min);
          humidity.push(item.main.humidity);
          pressure.push(item.main.pressure)
        });

        const minMax = {
          min: Math.round(Math.min(...min)),
          max: Math.round(Math.max(...max)),
        };

        const avgHumdity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);

        const avgPressure = Math.round(pressure.reduce((curr, next) => curr + next) / pressure.length);
        return (
          <div className="weather-info">
            <table>
              <tr className="otherBoxes">
                <th>Min</th>
                <th>Max</th>
              </tr>
              <tr className="otherBoxes">
                <td>{minMax.max} C</td>
                <td>{minMax.min} C</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{avgHumdity}%</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{avgPressure}</td>
              </tr>
            </table>
          </div>
        );
      };

  const fetchData = async () => {
    setLoader(true)
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&limit=5&units=metric&appid=7fc2842f3d3ebd026930df080bb7ad5b`
      );
      const tiles = Object.values(groupByDays(response?.data?.list));
      setWeatherData(tiles);
      setLoader(false)
    } catch (error) {
      console.error(error);
      setLoader(false)
    }
  };

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
            <TextField
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
              weatherData.slice(0, 5).map((item, index) => {
                return (
                  <Grid item className="eachCard">
                    <div className="eachCardStyles">
                      <Typography variant="h6" className="boxStyles firstBox">
                        Date : {new Date(item[0].dt * 1000).getUTCDate()} / {new Date(item[0].dt * 1000).getUTCMonth() + 1} / {new Date(item[0].dt* 1000).getFullYear()}
                      </Typography>
                      <Typography variant="h6" className="boxStyles otherBoxes">
                        {" "}
                        Temperature
                      </Typography>
                      {getInfo(item)}
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