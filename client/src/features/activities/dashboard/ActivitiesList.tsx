import React, { useState } from "react";
import {Button, Item, Label, Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity";

interface Props {
    activities: Activity[];
    handleSelectActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
    submitting: boolean;
}

export function ActivitiesList(props: Props) {

    const [target, setTarget] = useState(null);

    const handleDeleteButtonClick = (event: any, id: string) => {
        setTarget(event.target.getAttribute('name'));
        props.handleDeleteActivity(id);
    };

    return (
        <Segment>
            <Item.Group divided>
                {
                    props.activities.map((activity) => (
                        <Item key={activity.id}>
                            <Item.Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
                            <Item.Content>
                                <Item.Header as='h2'>{activity.title}</Item.Header>
                                <Item.Meta>{activity.category}</Item.Meta>
                                <Item.Description>
                                    {activity.description}
                                </Item.Description>
                                <Item.Extra>
                                    <Button primary floated="right" onClick={() => props.handleSelectActivity(activity.id)}> View </Button>
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