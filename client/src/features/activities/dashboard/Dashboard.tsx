import {Activity} from "../../../app/models/activity";
import {ActivitiesList} from "./ActivitiesList";
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
    submitting: boolean;
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
                                      submitting,
                                      handleDeleteActivity
                                  }: Props) {

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivitiesList activities={activities} handleSelectActivity={handleSelectActivity} submitting={submitting}
                                handleDeleteActivity={handleDeleteActivity}/>
            </GridColumn>
            <GridColumn width={6}>
                {
                    activityEditMode &&
                    <ActivityForm handleCancelEditActivityForm={handleCancelEditActivityForm} submitting={submitting}
                                               selectedActivity={selectedActivity} handleFormSubmit={handleFormSubmit}/>
                }
                {
                    (selectedActivity && !activityEditMode) &&
                    <ActivityDetails activity={selectedActivity} handleCancelActivity={handleCancelActivity} submitting={submitting}
                                     handleOpenEditActivityForm={handleOpenEditActivityForm}/>
                }
            </GridColumn>
        </Grid>
    );
}