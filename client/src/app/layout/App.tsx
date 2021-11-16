import {Fragment, useEffect, useState} from "react";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import NavBar from "./NavBar";
import Dashboard from "../../features/activities/dashboard/Dashboard";
import { ActivitiesApis } from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [activityEditMode, setActivityEditMode] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        ActivitiesApis.list().then((response) => {
            setActivities(response.data);
            setLoading(false);
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

    const handleDeleteActivity = async (id: string) => {
        await ActivitiesApis.delete(id);
        setActivities([...activities.filter(a => a.id !== id)]);
        if (id === selectedActivity?.id) {
            setSelectedActivity(undefined);
            setActivityEditMode(false);
        }
    }

    const handleFormSubmit = async (activity: Activity) => {
        setSubmitting(true);

        if(activity.id){
            await ActivitiesApis.update(activity);
            setActivities([...activities.filter(a => a.id !== activity.id), activity]);
            setSelectedActivity(activity);
        }else{
            const data = await ActivitiesApis.create(activity);
            setActivities([...activities, data]);
            setSelectedActivity(data);
        }

        setSubmitting(false);
        setActivityEditMode(false);
    }

    if(loading){
        return <LoadingComponent content={"Loading"} inverted={true} active={true}></LoadingComponent>;
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
                           submitting={submitting}
                           handleDeleteActivity={handleDeleteActivity}/>
            </Container>
        </Fragment>
    );
}

export default App;
