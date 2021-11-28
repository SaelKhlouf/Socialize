import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { RootState } from "../../../app/redux/rootReducer";
import { ActivityListItem } from "./ActivityListItem";

export function ActivitiesList() {
    const activitiesRegistry = useSelector((state: RootState) => state.activities.activitiesRegistry);

    const activitiesGroupedByDate = (activitiesRegistry: {[key: string]: Activity}) => {
        const activities = Object.values(activitiesRegistry);
        const sortedActivities = activities.sort((a,b) => Date.parse(b.date) - Date.parse(a.date));
        const groupedActivities : {[key: string]: Activity[]} = {};

        sortedActivities.map(activity => {
            if(!groupedActivities[activity.date]){
                groupedActivities[activity.date] = [];
            }
            groupedActivities[activity.date].push(activity);
        });
        return groupedActivities;
    }

    return (
            <Fragment>
                {
                    Object.values(activitiesGroupedByDate(activitiesRegistry))
                    .map((activities) => 
                        (
                            <Fragment>
                                <h4> Date: {activities[0].date} </h4>
                                <Item.Group divided>
                                    {
                                        activities.map((activity) => 
                                        <ActivityListItem key={activity.id} activity={activity} />
                                        )
                                    }
                                </Item.Group>
                            </Fragment>
                        )
                    )
                }
            </Fragment>
    );
}