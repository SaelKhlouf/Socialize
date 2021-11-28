import { useDispatch, useSelector } from "react-redux";
import {Button, Item, Label, Segment} from "semantic-ui-react";
import { deleteActivity, getActivity, selectActivityAction } from "../activitiesReducer";
import { AppDispatch } from "../../../app/redux/store";
import { RootState } from "../../../app/redux/rootReducer";
import { NavLink } from "react-router-dom";
import { Activity } from "../../../app/models/activity";

interface ActivityListItemProps{
    activity: Activity;
}

export function ActivityListItem({activity}: ActivityListItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const target = useSelector((state: RootState) => state.activities.target);
    const activitiesRegistry = useSelector((state: RootState) => state.activities.activitiesRegistry);

    const handleDeleteButtonClick = (event: any, id: string) => {
        const target = event.target.getAttribute('name');
        dispatch(deleteActivity({id, target}));
    };
    const handleSelectActivity = (id: string) => {
        const activityInMemory = activitiesRegistry[id];
        if(activityInMemory){
            dispatch(selectActivityAction(activityInMemory));
        }else{
            dispatch(getActivity(id));
        }
    }

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item key={activity.id}>
                        <Item.Image src={`/assets/user.png`} size='tiny' inline={true}/>
                        <Item.Content>
                            <Item.Header as='h2'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.category}</Item.Meta>
                            <Item.Description>
                                {activity.description}
                            </Item.Description>
                            <Item.Extra>
                                <Button primary floated="right" onClick={() => handleSelectActivity(activity.id)} as={NavLink} to={`${activity.id}`}> View </Button>
                                <Button name = {activity.id} floated="right" color='red' loading={target === activity.id} onClick={(e) => handleDeleteButtonClick(e, activity.id)}> Delete </Button>
                                <Label as='a'>{activity.category}</Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    );
}