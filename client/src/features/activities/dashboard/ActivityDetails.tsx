import {Button, Card, Container, Form, Grid, GridColumn, Icon, Image, Segment, TextArea} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { attendActivity, cancelActivityAttendance, getActivity, setActivityCommentReducer } from "../reducer";
import { RootState } from "../../../app/redux/rootReducer";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/loading";
import { ActivityComment } from "./ActivityComment";
import { ActivityAttendanceInfo } from "./ActivityAttendanceInfo";
import { formatDateWithoutTime } from "../../../common/helpers";

export default function ActivityDetails() {
    const dispatch = useDispatch<AppDispatch>();
    let params = useParams();

    const activityId = params.id;

    const {activitiesRegistry, loading, activityComment, submitting} = useSelector((state: RootState) => state.activities);
    const {currentUser} = useSelector((state: RootState) => state.users);

    const activity = activitiesRegistry[activityId!];

    useEffect(() => {
        if(activityId){
            const activityInMemory = activitiesRegistry[activityId];
            if(!activityInMemory)
            {
                dispatch(getActivity(activityId));
            }
        }
    }, [dispatch, activitiesRegistry, activityId]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value} = event.target;
        dispatch(setActivityCommentReducer(value));
    };

    const handleAttendActivity = () => {
        if(activityId){
            dispatch(attendActivity(activityId));

        }
    };

    const handleCancelActivityAttendance = () => {
        if(activityId){
            dispatch(cancelActivityAttendance(activityId));
        }
    };

    const isHost = () => activity?.host.id === currentUser.id;
    const isAttending = () => activity?.users.some(p => p.id === currentUser.id) === true ? true : false;

    if(loading){
        return <LoadingComponent content={"Loading"} inverted={true} active={true}></LoadingComponent>;
    }

    return (
    <Container>
        <Grid>
            <GridColumn width={10}>

                <Card fluid style={{position: 'relative', display: 'flex'}}>
                        <Image style={{filter : 'brightness(50%)'}} src={`/assets/categoryImages/${activity?.category}.jpg`}/>
                        <Card.Content style={{
                            position: "absolute",
                            left: '5%',
                            top: '50%'
                        }}>
                            <Card.Header style={{color: 'white', fontSize: '2em'}}> <p>{activity?.title}</p> </Card.Header>
                            <Card.Meta>
                                <p style={{color: 'white', fontSize: '1.0em', opacity: '80%'}}> {activity && activity.date && formatDateWithoutTime(activity.date)} </p>
                            </Card.Meta>
                            <Card.Description style={{color: 'white', marginTop: '0.6em', fontSize: '1.0em'}}>
                                <p> Hosted by <span style={{fontWeight: 'bold'}}> Sael </span> </p>
                            </Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                        <Card.Description>
                            {
                                isAttending() ?
                                <Button onClick={handleCancelActivityAttendance} loading={submitting}>Cancel attendance</Button>
                                : <Button color='teal' onClick={handleAttendActivity} loading={submitting}>Attend activity</Button>
                            }
                        
                            {
                                isHost() ?
                                <Button color='orange' style={{float: 'right'}} as={NavLink} to={`/activities/${activity?.id}/edit`}>
                                    Manage event
                                </Button>
                                : null
                            }

                        </Card.Description>
                    </Card.Content>

                </Card>

                <Segment.Group>
                    <Segment>
                        <Icon name='info' color='teal' /> 
                        <span style={{marginLeft:'1em'}}> {activity?.description} </span>
                    </Segment>

                    <Segment>
                        <Icon name='calendar' color='teal' /> 
                        <span style={{marginLeft:'1em'}}> {activity && activity.date && formatDateWithoutTime(activity.date)} </span>
                    </Segment>

                    <Segment>
                        <Icon name='location arrow' color='teal' /> 
                        <span style={{marginLeft:'1em'}}> {activity?.city} </span>
                    </Segment>
                </Segment.Group>

                <Segment.Group>
                    <Segment inverted color='teal' textAlign='center'>
                        <p color='white'> Chat about this event </p>
                    </Segment>

                    <Segment>
                        <ActivityComment author='sael' body='This is a nice activity!' time='5:46 PM' />
                        <ActivityComment author='ahmad' body='This is boring guuys' time='3 days ago' />
                        
                    </Segment>

                    <Segment clearing>
                        
                        <Form autoComplete="off">
                        
                            <Form.Field control={TextArea} placeholder='Write a comment here' name='comment' value={activityComment} type="textarea"
                                        onChange={handleInputChange}/>

                            <Button primary floated="left" type='submit' loading={submitting}> <Icon name='reply'/>Add Reply</Button>
                        </Form>
                    

                    </Segment>
                </Segment.Group>

            </GridColumn>

            <GridColumn width={6}>
                {activity && (
                    <ActivityAttendanceInfo activity={activity} />
                )}
            </GridColumn>

        </Grid>
    </Container>
    
    );
}
