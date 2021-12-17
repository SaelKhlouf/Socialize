import { Segment } from "semantic-ui-react";
import { Activity } from "../models";
import { ActivityAttendanceInfoRow } from "./ActivityAttendanceInfoRow";

interface Props{
    activity: Activity;
}

export function ActivityAttendanceInfo({activity}: Props){
    return (
        <Segment.Group>
            <Segment inverted color='teal' textAlign='center'>
                {activity.users.length} People Going
            </Segment>
            {
                activity.users.map(attendee => (
                    <Segment key={attendee.id}>
                        <ActivityAttendanceInfoRow attendee={attendee} host={activity.host}/>
                    </Segment>
                ))
            }
        </Segment.Group>
    )}