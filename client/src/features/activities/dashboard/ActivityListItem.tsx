import { useDispatch, useSelector } from "react-redux";
import {Button, Header, Icon, Item, Label, List, Segment} from "semantic-ui-react";
import { getActivity, setActivityReducer } from "../reducer";
import { AppDispatch } from "../../../app/redux/store";
import { RootState } from "../../../app/redux/rootReducer";
import { NavLink } from "react-router-dom";
import { formatDateWithoutTime } from "../../../common/helpers";
import { Activity, ActivityStatus } from "../models";

interface ActivityListItemProps{
    activity: Activity;
}

export function ActivityListItem({activity}: ActivityListItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const {activitiesRegistry} = useSelector((state: RootState) => state.activities);
    const {currentUser} = useSelector((state: RootState) => state.users);

    const handleSelectActivity = (id: string) => {
        const activityInMemory = activitiesRegistry[id];
        if(activityInMemory){
            dispatch(setActivityReducer(activityInMemory));
        }else{
            dispatch(getActivity(id));
        }
    }

    const isHost = () => activity.host?.id === currentUser?.id;
    const isAttending = () => activity.users?.some(p => p.id === currentUser?.id) === true ? true : false;

    let currentUserStatus = null;
    if(isHost()){
        currentUserStatus = 'host';
    } else if(isAttending()){
        currentUserStatus = 'going';
    }

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
                            {
                                currentUserStatus != null &&
                                (
                                    <Item.Meta>
                                        {
                                            currentUserStatus === 'host' ?
                                            (<Label basic color='orange'> You are hosting this activity </Label>)
                                            :
                                            (<Label basic color='blue'> You are going to this activity </Label>)
                                        }
                                    </Item.Meta>
                                )
                            }
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
                    <List.Item>
                        <Item.Image src={`/assets/user.png`} size='mini' circular inline/>
                    </List.Item>
                </List>
            </Segment>

            <Segment clearing>
                <Label as='a'>{activity.category}</Label>
                <Button color="teal" floated="right" onClick={() => handleSelectActivity(activity.id)} as={NavLink} to={`${activity.id}`}> View </Button>
            </Segment>
        </Segment.Group>
    );
}
