import React from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import { useState, useEffect } from "react";
import axios from "axios";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

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

const markers = [];
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = (props) => {
    const classes = useStyles();
    let data = [];
    const [mar, setmar] = useState([]);
    
    function getdata(){
        markers.splice(0, markers.length)
        axios.get("/api/countries")
        .then(res => {
            data = res.data.last_hour_locations;

            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                const coordinates = Object.values(element)
                markers.push({key: i, coordinates: [ coordinates[1], coordinates[0] ]});            
            }
            setmar([...markers]);
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getdata();
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
                        Location of Users who accessed the software/website in the last one hour
                    </Typography>
                </div>
                <div>
                    <ComposableMap>
                        {/* <ZoomableGroup zoom={1}> */}
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map(geo => (
                                        <Geography key={geo.rsmKey}
                                            geography={geo}
                                            fill="#15b4ed"
                                            stroke="#262b24"
                                        />
                                    ))
                                }
                            </Geographies>
                            {console.log(mar)}
                            {mar.map(({ coordinates, key }) => (
                                <Marker key={key} coordinates={coordinates}>
                                    <circle r={4} fill="#F00" stroke="#000000" strokeWidth={1} />
                                </Marker>
                            ))}
                        {/* </ZoomableGroup> */}
                    </ComposableMap>
                </div>
            </main>
        </div>
    );
};

export default MapChart;