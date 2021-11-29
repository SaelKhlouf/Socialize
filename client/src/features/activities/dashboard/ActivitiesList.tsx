import moment from "moment";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Item } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { RootState } from "../../../app/redux/rootReducer";
import { ActivityListItem } from "./ActivityListItem";

export function ActivitiesList() {
    const activitiesRegistry = useSelector((state: RootState) => state.activities.activitiesRegistry);

    const activitiesGroupedByDate = (activitiesRegistry: {[key: string]: Activity}) => {
        const activities = Object.values(activitiesRegistry);
        const sortedActivities = activities.sort((a,b) => Date.parse(b.date) - Date.parse(a.date));
        const groupedActivities : {[key: string]: Activity[]} = {};

        sortedActivities.forEach(activity => {
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
                            <Fragment key={activities[0].date}>
                                <h4 style={{color: "teal", marginBottom: 0}}>{moment(activities[0].date).format('YYYY-MM-DD')}</h4>
                                <Item.Group divided style={{ marginTop: '2%'}}>
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