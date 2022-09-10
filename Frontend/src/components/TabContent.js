import {Box, Typography, Card, CardContent, CardActions, Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import React, {useState} from "react";

export default function TabContent(props) {
    const deleteHandler = (id) => {
        props.onDelete(id)
    }
    const getCoordsHandler = (point) => {
        props.getCoords(point)
    }

    return (
        // <ul>
        //   {props.plan.map((item, index) => (
        //     <li key={index}>
        //       {item.placeId + " , " + item.placeName + " , " + item.timeSlot}
        //     </li>
        //   ))}
        // </ul>
        <Box>
            <Box>
                <Typography variant="h5" component="div" sx={{mb: 1}}>Breakfast</Typography>
                {props.plan
                    .filter((item, index) => item.timeSlot === "breakfast")
                    .map((item, index) => (
                        <Card sx={{minWidth: 275, mb: 3, ':hover': {boxShadow: 3,}}} style={{display: 'flex', flexDirection: 'row'}}>
                            <CardActions>
                                <IconButton aria-label="location" color="primary"
                                            onClick={() => getCoordsHandler(item.point)}>
                                    <AddLocationIcon/>
                                </IconButton>
                            </CardActions>
                            <CardContent sx={{flexGrow:1}}>
                                <Typography variant="h5">
                                    {item.placeName}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="delete"
                                            onClick={() => deleteHandler(item.placeId)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
            </Box>
            <Box>
                <Typography variant="h5" component="div" sx={{mb: 1}}>Lunch</Typography>
                {props.plan
                    .filter((item, index) => item.timeSlot === "lunch")
                    .map((item, index) => (
                        <Card sx={{minWidth: 275, mb: 3, ':hover': {boxShadow: 3,}} } style={{display: 'flex', flexDirection: 'row'}}>
                            <CardActions>
                                <IconButton aria-label="location" color="primary"
                                            onClick={() => getCoordsHandler(item.point)}>
                                    <AddLocationIcon/>
                                </IconButton>
                            </CardActions>
                            <CardContent sx={{flexGrow:1}}>
                                <Typography variant="h5">
                                    {item.placeName}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="delete"
                                            onClick={() => deleteHandler(item.placeId)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
            </Box>
            <Box>
                <Typography variant="h5" component="div" sx={{mb: 1}}>Dinner</Typography>
                {props.plan
                    .filter((item, index) => item.timeSlot === "dinner")
                    .map((item, index) => (
                        <Card sx={{minWidth: 275, mb: 3, ':hover': {boxShadow: 3,}}} style={{display: 'flex', flexDirection: 'row'}}>
                            <CardActions>
                                <IconButton aria-label="location" color="primary"
                                            onClick={() => getCoordsHandler(item.point)}>
                                    <AddLocationIcon/>
                                </IconButton>
                            </CardActions>
                            <CardContent sx={{flexGrow:1}}>
                                <Typography variant="h5">
                                    {item.placeName}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="delete"
                                            onClick={() => deleteHandler(item.placeId)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
            </Box>
        </Box>
    );
}
