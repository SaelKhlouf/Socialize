import {Button, Item, Label, Segment} from "semantic-ui-react";
import React from "react";
import {Activity} from "../../../app/models/activity";

interface Props {
    activities: Activity[];
    handleSelectActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
}

export function ActivitiesList(props: Props) {
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
                                    <Button floated="right" color='red' onClick={() => props.handleDeleteActivity(activity.id)}> Delete </Button>
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