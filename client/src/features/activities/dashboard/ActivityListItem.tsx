import { useDispatch, useSelector } from "react-redux";
import {Button, Card, Header, Icon, Item, Label, List, Popup, Segment} from "semantic-ui-react";
import { getActivity, setActivityReducer } from "../reducer";
import { AppDispatch } from "../../../app/redux/store";
import { RootState } from "../../../app/redux/rootReducer";
import { NavLink } from "react-router-dom";
import { formatDateWithoutTime } from "../../../common/helpers";
import { Activity, ActivityStatus, mapEditActivityModel } from "../models";

interface ActivityListItemProps{
    activity: Activity;
}

export function ActivityListItem({activity}: ActivityListItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const {activitiesRegistry} = useSelector((state: RootState) => state.activities);
    const {currentUser} = useSelector((state: RootState) => state.users);

    const handleSelectActivity = (id: string) => {
        const activity = activitiesRegistry[id];
        if(activity){
            const editActivityModel = mapEditActivityModel(activity);
            dispatch(setActivityReducer(editActivityModel));
        }else{
            dispatch(getActivity(id));
        }
    }

    const isHost = () => activity.host.id === currentUser.id;
    const isAttending = () => activity.users.some(p => p.id === currentUser.id) === true ? true : false;

    return (
        <Segment.Group>
            {
                activity.status === ActivityStatus.Cancelled &&
                (
                    <Segment style={{backgroundColor: 'red', textAlign: 'center'}}>
                        <Header as='h3' inverted> Cancelled </Header>
                    </Segment>
                )
            }

            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image src={`/assets/user.png`} size='tiny' inline/>
                        <Item.Content>
                            <Item.Header as='h2'>{activity.title}</Item.Header>
                            <Item.Meta>Hosted by Sael</Item.Meta>

                                <Item.Meta>
                                    {
                                        isHost() ?
                                        (<Label basic color='orange'> You are hosting this activity </Label>)
                                        : 
                                        isAttending() ?
                                        (<Label basic color='blue'> You are going to this activity </Label>)
                                        : null
                                    }
                                </Item.Meta>

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
                <List horizontal>
                    {
                        activity.users.map(user => (
                            <List.Item key={user.id}>
                                <Popup flowing hoverable
                                    trigger={
                                        <Item.Image src={`/assets/user.png`} size='mini' circular inline/>
                                    }
                                >
                                    <Popup.Content>
                                        <Card>
                                            <Card.Header style={{textAlign: 'center'}}>
                                                <Item.Image src={`/assets/user.png`} size='small'/>
                                            </Card.Header>
                                            <Card.Content>
                                            <Card.Header>{user.displayName}</Card.Header>
                                            <Card.Meta>
                                                <span className='date'>Joined in 2015</span>
                                            </Card.Meta>
                                            <Card.Description>
                                                Bio goes here
                                            </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <Icon name='user' />
                                                22 Followers
                                            </Card.Content>
                                        </Card>
                                    </Popup.Content>
                                </Popup>
                            </List.Item>
                        ))
                    }
                </List>
            </Segment>

            <Segment clearing>
                <Label as='a'>{activity.category}</Label>
                <Button color="teal" floated="right" onClick={() => handleSelectActivity(activity.id)} as={NavLink} to={`${activity.id}`}> View </Button>
            </Segment>
        </Segment.Group>
    );
}
