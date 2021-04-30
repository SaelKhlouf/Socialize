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

    return (
        <Fragment>
            <NavBar/>
            <Container style={{marginTop: '8em'}}>
                <Dashboard activities={activities} />
            </Container>
        </Fragment>
    );
}

export default App;
