import {Activity} from "../../../app/models/activity";
import {ActivitiesList} from "./ActivitiesList";
import React from "react";
import {Grid, GridColumn} from "semantic-ui-react";
import ActivityDetails from "./ActivityDetails";

interface Props {
    activities: Activity[];
}

export default function Dashboard(props: Props) {
    return (
        <Grid>
            <GridColumn width={10}>
                <ActivitiesList activities={props.activities} />
            </GridColumn>
            <GridColumn width={6}>
                <ActivityDetails activity = {props.activities[0]} />
            </GridColumn>
        </Grid>
    );
}