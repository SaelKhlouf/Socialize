import {Activity} from "../../../app/models/activity";
import {ActivitiesList} from "./ActivitiesList";
import React from "react";
import {Grid, GridColumn} from "semantic-ui-react";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    handleOpenEditActivityForm: () => void;
    handleCancelEditActivityForm: () => void;
    activityEditMode: boolean;
    handleSelectActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
    handleCancelActivity: () => void;
    handleFormSubmit: (activity: Activity) => void;
}

export default function Dashboard({
                                      activities,
                                      selectedActivity,
                                      activityEditMode,
                                      handleSelectActivity,
                                      handleCancelActivity,
                                      handleOpenEditActivityForm,
                                      handleCancelEditActivityForm,
                                      handleFormSubmit,
                                      handleDeleteActivity
                                  }: Props) {

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivitiesList activities={activities} handleSelectActivity={handleSelectActivity}
                                handleDeleteActivity={handleDeleteActivity}/>
            </GridColumn>
            <GridColumn width={6}>
                {
                    activityEditMode &&
                    <ActivityForm handleCancelEditActivityForm={handleCancelEditActivityForm}
                                               selectedActivity={selectedActivity} handleFormSubmit={handleFormSubmit}/>
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