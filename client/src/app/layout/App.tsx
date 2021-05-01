import axios from "axios";
import React, {Fragment, useEffect, useState} from "react";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import NavBar from "./NavBar";
import Dashboard from "../../features/activities/dashboard/Dashboard";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    useEffect(() => {
        axios.get<Activity[]>("https://mocki.io/v1/b1445f51-50c5-4c81-993f-da8c84551b29").then((response) => {
            setActivities(response.data);
        });
    }, []);

    const [activityEditMode, setActivityEditMode] = useState(false);

    const handleOpenEditActivityForm = () => {
        setActivityEditMode(true);
    }

    const handleCancelEditActivityForm = () => {
        setActivityEditMode(false);
    }

    return (
        <Fragment>
            <NavBar handleOpenEditActivityForm={handleOpenEditActivityForm}/>
            <Container style={{marginTop: '8em'}}>
                <Dashboard activities={activities} activityEditMode={activityEditMode}
                           handleOpenEditActivityForm={handleOpenEditActivityForm}
                           handleCancelEditActivityForm={handleCancelEditActivityForm}/>
            </Container>
        </Fragment>
    );
}

export default App;
