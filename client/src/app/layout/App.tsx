import axios from "axios";
import React, {Fragment, useEffect, useState} from "react";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import NavBar from "./NavBar";
import Dashboard from "../../features/activities/dashboard/Dashboard";
import {v4 as uuid} from 'uuid'

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [activityEditMode, setActivityEditMode] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

    useEffect(() => {
        axios.get<Activity[]>("https://mocki.io/v1/b1445f51-50c5-4c81-993f-da8c84551b29").then((response) => {
            setActivities(response.data);
        });
    }, []);


    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find(a => a.id === id));
    }

    const handleCancelActivity = () => {
        setSelectedActivity(undefined);
    }

    const handleOpenEditActivityForm = () => {
        setActivityEditMode(true);
    }

    const handleCancelEditActivityForm = () => {
        setActivityEditMode(false);
    }

    const handleDeleteActivity = (id: string) => {
        setActivities([...activities.filter(a => a.id !== id)]);
        if (id === selectedActivity?.id) {
            setSelectedActivity(undefined);
            setActivityEditMode(false);
        }
    }

    const handleFormSubmit = (activity: Activity) => {
        activity.id
            ? setActivities([...activities.filter(a => a.id !== activity.id), activity])
            : setActivities([...activities, {...activity, id: uuid()}]);
        setSelectedActivity(activity);
        setActivityEditMode(false);
    }

    return (
        <Fragment>
            <NavBar handleOpenEditActivityForm={handleOpenEditActivityForm}/>
            <Container style={{marginTop: '8em'}}>
                <Dashboard activities={activities}
                           selectedActivity={selectedActivity}
                           handleSelectActivity={handleSelectActivity}
                           handleCancelActivity={handleCancelActivity}
                           activityEditMode={activityEditMode}
                           handleOpenEditActivityForm={handleOpenEditActivityForm}
                           handleCancelEditActivityForm={handleCancelEditActivityForm}
                           handleFormSubmit={handleFormSubmit}
                           handleDeleteActivity={handleDeleteActivity}/>
            </Container>
        </Fragment>
    );
}

export default App;
