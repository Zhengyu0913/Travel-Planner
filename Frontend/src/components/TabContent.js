import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import React from "react";

export default function TabContent(props) {
    const deleteHandler = (id) => {
        props.onDelete(id);
    };
    const getCoordsHandler = (point) => {
        props.getCoords(point);
    };
    console.log(props.plan);
    return (
        <Box>
            {props.plan.length === 0
            ? (
                <Typography variant="h5" component="div" sx={{mb: 1}}>
                    No daily plan this day yet, how about add one?
                </Typography>)
            : null
        }
            <Box>
                {props.plan
                    .filter((item, index) => item.time_block === "BREAKFAST").length !== 0 ? (
                    <Typography variant="h5" component="div" sx={{mb: 1}}>
                        Breakfast
                    </Typography>) : null}
                {props.plan
                    .filter((item, index) => item.time_block === "BREAKFAST")
                    .map((item, index) => (
                        <Card
                            sx={{minWidth: 275, mb: 3, ":hover": {boxShadow: 3}}}
                            style={{display: "flex", flexDirection: "row"}}
                        >
                            <CardActions>
                                <IconButton
                                    aria-label="location"
                                    color="primary"
                                    onClick={() =>
                                        getCoordsHandler({lat: item.lat, lng: item.lng})
                                    }
                                >
                                    <AddLocationIcon/>
                                </IconButton>
                            </CardActions>
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography variant="h5">{item.place_entry_name}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => deleteHandler(item.place_entry_id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
            </Box>
            <Box>
                {props.plan
                    .filter((item, index) => item.time_block === "MORNING").length !== 0 ? (
                    <Typography variant="h5" component="div" sx={{mb: 1}}>
                        Morning
                    </Typography>) : null}
                {props.plan
                    .filter((item, index) => item.time_block === "MORNING")
                    .map((item, index) => (
                        <Card
                            sx={{minWidth: 275, mb: 3, ":hover": {boxShadow: 3}}}
                            style={{display: "flex", flexDirection: "row"}}
                        >
                            <CardActions>
                                <IconButton
                                    aria-label="location"
                                    color="primary"
                                    onClick={() =>
                                        getCoordsHandler({lat: item.lat, lng: item.lng})
                                    }
                                >
                                    <AddLocationIcon/>
                                </IconButton>
                            </CardActions>
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography variant="h5">{item.place_entry_name}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => deleteHandler(item.place_entry_id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
            </Box>
            <Box>
                {props.plan
                    .filter((item, index) => item.time_block === "LUNCH").length !== 0 ? (
                    <Typography variant="h5" component="div" sx={{mb: 1}}>
                        Lunch
                    </Typography>) : null}
                {props.plan
                    .filter((item, index) => item.time_block === "LUNCH")
                    .map((item, index) => (
                        <Card
                            sx={{minWidth: 275, mb: 3, ":hover": {boxShadow: 3}}}
                            style={{display: "flex", flexDirection: "row"}}
                        >
                            <CardActions>
                                <IconButton
                                    aria-label="location"
                                    color="primary"
                                    onClick={() =>
                                        getCoordsHandler({lat: item.lat, lng: item.lng})
                                    }
                                >
                                    <AddLocationIcon/>
                                </IconButton>
                            </CardActions>
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography variant="h5">{item.place_entry_name}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => deleteHandler(item.place_entry_id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
            </Box>
            <Box>
                {props.plan
                    .filter((item, index) => item.time_block === "AFTERNOON").length !== 0 ? (
                    <Typography variant="h5" component="div" sx={{mb: 1}}>
                        Afternoon
                    </Typography>) : null}
                {props.plan
                    .filter((item, index) => item.time_block === "AFTERNOON")
                    .map((item, index) => (
                        <Card
                            sx={{minWidth: 275, mb: 3, ":hover": {boxShadow: 3}}}
                            style={{display: "flex", flexDirection: "row"}}
                        >
                            <CardActions>
                                <IconButton
                                    aria-label="location"
                                    color="primary"
                                    onClick={() =>
                                        getCoordsHandler({lat: item.lat, lng: item.lng})
                                    }
                                >
                                    <AddLocationIcon/>
                                </IconButton>
                            </CardActions>
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography variant="h5">{item.place_entry_name}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => deleteHandler(item.place_entry_id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
            </Box>
            <Box>
                {props.plan
                    .filter((item, index) => item.time_block === "DINNER").length !== 0 ? (
                    <Typography variant="h5" component="div" sx={{mb: 1}}>
                        Dinner
                    </Typography>) : null}
                {props.plan
                    .filter((item, index) => item.time_block === "DINNER")
                    .map((item, index) => (
                        <Card
                            sx={{minWidth: 275, mb: 3, ":hover": {boxShadow: 3}}}
                            style={{display: "flex", flexDirection: "row"}}
                        >
                            <CardActions>
                                <IconButton
                                    aria-label="location"
                                    color="primary"
                                    onClick={() =>
                                        getCoordsHandler({lat: item.lat, lng: item.lng})
                                    }
                                >
                                    <AddLocationIcon/>
                                </IconButton>
                            </CardActions>
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography variant="h5">{item.place_entry_name}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => deleteHandler(item.place_entry_id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
            </Box>
            <Box>
                {props.plan
                    .filter((item, index) => item.time_block === "NIGHT").length !== 0 ? (
                    <Typography variant="h5" component="div" sx={{mb: 1}}>
                        Night
                    </Typography>) : null}
                {props.plan
                    .filter((item, index) => item.time_block === "NIGHT")
                    .map((item, index) => (
                        <Card
                            sx={{minWidth: 275, mb: 3, ":hover": {boxShadow: 3}}}
                            style={{display: "flex", flexDirection: "row"}}
                        >
                            <CardActions>
                                <IconButton
                                    aria-label="location"
                                    color="primary"
                                    onClick={() =>
                                        getCoordsHandler({lat: item.lat, lng: item.lng})
                                    }
                                >
                                    <AddLocationIcon/>
                                </IconButton>
                            </CardActions>
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography variant="h5">{item.place_entry_name}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => deleteHandler(item.place_entry_id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
            </Box>
            <Box>
                {props.plan
                    .filter((item, index) => item.time_block === "STAY").length !== 0 ? (
                    <Typography variant="h5" component="div" sx={{mb: 1}}>
                        Stay
                    </Typography>) : null}
                {props.plan
                    .filter((item, index) => item.time_block === "STAY")
                    .map((item, index) => (
                        <Card
                            sx={{minWidth: 275, mb: 3, ":hover": {boxShadow: 3}}}
                            style={{display: "flex", flexDirection: "row"}}
                        >
                            <CardActions>
                                <IconButton
                                    aria-label="location"
                                    color="primary"
                                    onClick={() =>
                                        getCoordsHandler({lat: item.lat, lng: item.lng})
                                    }
                                >
                                    <AddLocationIcon/>
                                </IconButton>
                            </CardActions>
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography variant="h5">{item.place_entry_name}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => deleteHandler(item.place_entry_id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
            </Box>

        </Box>
    );
}
