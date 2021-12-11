import { useDispatch, useSelector } from "react-redux";
import {Button, Icon, Item, Label, Segment} from "semantic-ui-react";
import { getActivity, setActivityReducer } from "../reducer";
import { AppDispatch } from "../../../app/redux/store";
import { RootState } from "../../../app/redux/rootReducer";
import { NavLink } from "react-router-dom";
import { formatDateWithoutTime } from "../../../common/helpers";
import { Activity } from "../models";

interface ActivityListItemProps{
    activity: Activity;
}

export function ActivityListItem({activity}: ActivityListItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const activitiesRegistry = useSelector((state: RootState) => state.activities.activitiesRegistry);

    const handleSelectActivity = (id: string) => {
        const activityInMemory = activitiesRegistry[id];
        if(activityInMemory){
            dispatch(setActivityReducer(activityInMemory));
        }else{
            dispatch(getActivity(id));
        }
    }

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image src={`/assets/user.png`} size='tiny' inline/>
                        <Item.Content>
                            <Item.Header as='h2'>{activity.title}</Item.Header>
                            <Item.Meta>Hosted by Sael</Item.Meta>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment>
                <Icon name="clock"/>
                    {activity.date && formatDateWithoutTime(activity.date) }
                <Icon name="location arrow"/>
                {activity.city}
            </Segment>

            <Segment>
                Attendees goes here
            </Segment>

            <Segment clearing>
                <Label as='a'>{activity.category}</Label>
                <Button color="teal" floated="right" onClick={() => handleSelectActivity(activity.id)} as={NavLink} to={`${activity.id}`}> View </Button>
            </Segment>
        </Segment.Group>
    );
}
