import { Segment } from "semantic-ui-react";
import { ActivityAttendanceInfoRow } from "./ActivityAttendanceInfoRow";

export function ActivityAttendanceInfo(){
    return (
        <Segment.Group divided>
            <Segment inverted color='teal' textAlign='center'>
                3 People Going
            </Segment>
            
            <Segment>
                <ActivityAttendanceInfoRow />
            </Segment>

            <Segment>
                <ActivityAttendanceInfoRow />
            </Segment>

            <Segment>
                <ActivityAttendanceInfoRow />
            </Segment>

        </Segment.Group>
    )}