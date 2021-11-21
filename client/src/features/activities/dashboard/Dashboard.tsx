import {ActivitiesList} from "./ActivitiesList";
import {Grid, GridColumn} from "semantic-ui-react";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/rootReducer";

export default function Dashboard() {
    const selectedActivity = useSelector((state: RootState) => state.activities.selectedActivity);
    const activityEditMode = useSelector((state: RootState) => state.activities.activityEditMode);

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivitiesList />
            </GridColumn>
            <GridColumn width={6}>
                {
                    activityEditMode &&
                    <ActivityForm />
                }
                {
                    (selectedActivity && !activityEditMode) &&
                    <ActivityDetails />
                }
            </GridColumn>
        </Grid>
    );
}