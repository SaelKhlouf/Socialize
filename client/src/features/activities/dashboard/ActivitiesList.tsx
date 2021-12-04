import { differenceInDays } from "date-fns";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Item } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { RootState } from "../../../app/redux/rootReducer";
import { formatDateWithoutTime } from "../../../common/helpers";
import { ActivityListItem } from "./ActivityListItem";

export function ActivitiesList() {
    const activitiesRegistry = useSelector((state: RootState) => state.activities.activitiesRegistry);

    const activitiesGroupedByDate = (activitiesRegistry: {[key: string]: Activity}) => {
        const activities = Object.values(activitiesRegistry);


        const sortedActivities = activities.sort((a,b) => differenceInDays(b.date!, a.date!));
        const groupedActivities : {[key: string]: Activity[]} = {};

        sortedActivities.forEach(activity => {
            if(activity.date){
                const formattedDateWithoutTime = formatDateWithoutTime(activity.date!);
                if(!groupedActivities[formattedDateWithoutTime]){
                    groupedActivities[formattedDateWithoutTime] = [];
                }
                groupedActivities[formattedDateWithoutTime].push(activity);
            }
        });
        return groupedActivities;
    }

    return (
            <Fragment>
                {
                    Object.values(activitiesGroupedByDate(activitiesRegistry))
                    .map((activities) => 
                        {
                            const date = activities[0].date;
                            let formattedDateWithoutTime;

                            if(date){
                                formattedDateWithoutTime = formatDateWithoutTime(date!);
                            }
                            return(
                                <Fragment key={formattedDateWithoutTime}>
                                    <h4 style={{color: "teal", marginBottom: 0}}>{formattedDateWithoutTime}</h4>
                                    <Item.Group divided style={{ marginTop: '2%'}}>
                                        {
                                            activities.map((activity) => 
                                                <ActivityListItem key={activity.id} activity={activity} />
                                            )
                                        }
                                    </Item.Group>
                                </Fragment>
                            );
                        }
                    )
                }
            </Fragment>
    );
}