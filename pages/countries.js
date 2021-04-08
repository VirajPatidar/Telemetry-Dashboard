import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
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
}));

export default function Usercountries(props) {
  const classes = useStyles();

  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});
  var countries1 = [];
  var countries2 = [];
  let data1 = [];
  let data2 = [];

  function chart(){
        
    axios.get("http://localhost:3000/api/countries")
    .then(res => {

      countries1 = [...(Object.keys(res['data']['country_counts']))].slice(0, 21);
      console.log(countries1);
      data1 = [...(Object.values(res['data']['country_counts']))].slice(0, 21);
      console.log(data1);

        setChartData1({
          labels: countries1,
          datasets: [
            {
              label: 'Users',
              data: data1,
              backgroundColor: "rgba(77,255,184, 0.6)",
              borderColor: 'rgba(255,99,132,1)',
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              borderWidth: 2
            }
          ]
        });

      countries2 = [...(Object.keys(res['data']['country_counts']))].slice(21, 187);
      console.log(countries2);
      data2 = [...(Object.values(res['data']['country_counts']))].slice(21, 187);
      console.log(data2);

        setChartData2({
          labels: countries2,
          datasets: [
            {
              label: 'Users',
              data: data2,
              backgroundColor: "rgb(0,0,0)",
              hoverBackgroundColor: 'rgb(255,255,0)',
            }
          ]
        });
    })
    .catch(err => {
      console.log(err);
    });
  };

  useEffect(() => {
    chart();
  }, []);

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
          <Typography variant="h5">
            Number of users across top 20 Countries
          </Typography>
          <Typography variant="body1" gutterBottom>
            Hover on a specific bar/country to know the number of users from that region
          </Typography>
        </div>
        <div>
          <Bar
            data={chartData1}
            options={{
              responsive: true,
              title: { text: "Number of users across top 20 Countries", display: true },
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
        <br/>
        <Divider />
        <br/>
        <br/>
        <div>
          <Typography variant="h5">
            Analysis of number of users in remaining Countries
          </Typography>
          <Typography variant="body1" gutterBottom>
            Hover on a specific bar/country to know the number of users from that region
          </Typography>
        </div>
        <div>
          <Bar
            data={chartData2}
            options={{
              responsive: true,
              title: { text: "Number of users across bottom 187 Countries", display: true },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: false,
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