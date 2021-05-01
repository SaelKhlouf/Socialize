import {Activity} from "../../../app/models/activity";
import {ActivitiesList} from "./ActivitiesList";
import React, {useState} from "react";
import {Grid, GridColumn} from "semantic-ui-react";
import ActivityDetails from "./ActivityDetails";
import ActivityCreateAndEditForm from "./ActivityCreateAndEditForm";

interface Props {
    activities: Activity[];
    handleOpenEditActivityForm: () => void;
    handleCancelEditActivityForm: () => void;
    activityEditMode: boolean;
}

export default function Dashboard({
                                      activities,
                                      activityEditMode,
                                      handleOpenEditActivityForm,
                                      handleCancelEditActivityForm
                                  }: Props) {
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);


    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find(a => a.id === id));
    }

    const handleCancelActivity = () => {
        setSelectedActivity(undefined);
    }

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivitiesList activities={activities} handleSelectActivity={handleSelectActivity}/>
            </GridColumn>
            <GridColumn width={6}>
                {
                    activityEditMode &&
                    <ActivityCreateAndEditForm handleCancelEditActivityForm={handleCancelEditActivityForm}/>
                }
                {
                    (selectedActivity && !activityEditMode) &&
                    <ActivityDetails activity={selectedActivity} handleCancelActivity={handleCancelActivity}
                                     handleOpenEditActivityForm={handleOpenEditActivityForm}/>
                }
            </GridColumn>
        </Grid>
    );
}