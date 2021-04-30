import {Activity} from "../../../app/models/activity";
import {ActivitiesList} from "./ActivitiesList";
import React, {useState} from "react";
import {Grid, GridColumn} from "semantic-ui-react";
import ActivityDetails from "./ActivityDetails";
import ActivityEditForm from "./ActivityEditForm";

interface Props {
    activities: Activity[];
}

export default function Dashboard(props: Props) {
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(props.activities.find(a => a.id === id));
    }

    const handleCancelActivity = () => {
        setSelectedActivity(undefined);
    }

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivitiesList activities={props.activities} handleSelectActivity={handleSelectActivity}/>
            </GridColumn>
            <GridColumn width={6}>
                {selectedActivity &&
                <ActivityDetails activity={selectedActivity} handleCancelActivity={handleCancelActivity}/>}
                <ActivityEditForm/>
            </GridColumn>
        </Grid>
    );
}