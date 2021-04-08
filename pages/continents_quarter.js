import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ContinentsQuarter(props) {
  const classes = useStyles();

  const [chartData, setChartData] = useState({});
  const [location, setlocation] = React.useState('all');
  const [open, setOpen] = React.useState(false);
  var continents = ["Asia", "North America", "Africa", "Europe", "South America", "Oceania"];
  
  const handleChange = (event) => {
    setlocation(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function getRandomColor() {
    var bgColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ", 0.6)";
    return bgColor;
  }

  function chart(){
    let quarters = [];
    let locdata = [];
    let all = [];
    
    axios.get("http://localhost:3000/api/countries_quarter")
    .then(res => {

      quarters=res.data.quarters;
      continents = [...(Object.keys(res['data']['continents']))];
      
      if(location === 'all'){
        for (let i = 0; i < continents.length; i++) {
          const element = continents[i];
          all.push(
            {
              label: element,
              data: res['data']['continents'][element],
              backgroundColor: [getRandomColor()],
              borderWidth: 4
            }
          )
        }

        setChartData({
          labels: quarters,
          datasets: all
        });

      }
      else {
        locdata = res['data']['continents'][location];

        setChartData({
          labels: quarters,
          datasets: [
            {
              label: location,
              data: locdata,
              backgroundColor: ["rgba(77,255,184, 0.6)"],
              borderWidth: 4
            }
          ]
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  };

  useEffect(() => {
    chart();
    
  }, [location]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.open,
        })}
      >
      <div className={classes.drawerHeader} />
        <div>
          <Typography variant="h5" gutterBottom>
            Quaterly Analysis of active users across Continents
          </Typography>
          <Typography variant="body1" gutterBottom>
            Select a location to see Analysis of that region. <br/>
            To compare data select all and click on the colour coded buttons to eliminate a paticular region.
          </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Location</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={location}
              onChange={handleChange}
            >

              <MenuItem key={"all"} value={"all"}>All</MenuItem>
              { continents.map((c) => (<MenuItem key={c} value={c}> {c} </MenuItem>))}

            </Select>
          </FormControl>
        </div>
        <div>
          <Line
            data={chartData}
            options={{
              responsive: true,
              title: { text: "Quaterly Users in Continents", display: true },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                      beginAtZero: true
                    },
                    gridLines: {
                      display: true
                    }
                  }
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: true
                    }
                  }
                ]
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}