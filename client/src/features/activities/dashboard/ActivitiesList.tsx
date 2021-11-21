import { useDispatch, useSelector } from "react-redux";
import {Button, Item, Label, Segment} from "semantic-ui-react";
import { deleteActivity, selectActivityAction } from "../activitiesReducer";
import { AppDispatch } from "../../../app/redux/store";
import { RootState } from "../../../app/redux/rootReducer";

export function ActivitiesList() {
    const dispatch = useDispatch<AppDispatch>();

    const target = useSelector((state: RootState) => state.activities.target);
    const activities = useSelector((state: RootState) => state.activities.activities);

    const handleDeleteButtonClick = (event: any, id: string) => {
        const target = event.target.getAttribute('name');
        dispatch(deleteActivity({id, target}));
    };

    const handleSelectActivity = (id: string) => {
        dispatch(selectActivityAction(activities.find(a => a.id === id)));
    }

    return (
        <Segment>
            <Item.Group divided>
                {
                    activities.map((activity) => (
                        <Item key={activity.id}>
                            <Item.Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
                            <Item.Content>
                                <Item.Header as='h2'>{activity.title}</Item.Header>
                                <Item.Meta>{activity.category}</Item.Meta>
                                <Item.Description>
                                    {activity.description}
                                </Item.Description>
                                <Item.Extra>
                                    <Button primary floated="right" onClick={() => handleSelectActivity(activity.id)}> View </Button>
                                    <Button name = {activity.id} floated="right" color='red' loading={target === activity.id} onClick={(e) => handleDeleteButtonClick(e, activity.id)}> Delete </Button>
                                    <Label as='a'>{activity.category}</Label>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))
                }
            </Item.Group>
        </Segment>
    );
}