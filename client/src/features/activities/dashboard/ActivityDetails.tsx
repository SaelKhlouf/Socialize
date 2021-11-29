import {Button, Card, Container, Form, Grid, GridColumn, Icon, Image, Segment, TextArea} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { getActivity, setActivityCommentReducer } from "../activitiesReducer";
import { RootState } from "../../../app/redux/rootReducer";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import moment from "moment";
import { ActivityComment } from "./ActivityComment";
import { ActivityAttendanceInfo } from "./ActivityAttendanceInfo";

export default function ActivityDetails() {
    const dispatch = useDispatch<AppDispatch>();

    const activity = useSelector((state: RootState) => state.activities.activity);
    const activitiesRegistry = useSelector((state: RootState) => state.activities.activitiesRegistry);
    const loading = useSelector((state: RootState) => state.activities.loading);
    const activityComment = useSelector((state: RootState) => state.activities.activityComment);
    const submitting = useSelector((state: RootState) => state.activities.submitting);

    let params = useParams();

    useEffect(() => {
        if(params.id){
            const activityInMemory = activitiesRegistry[params.id];
            if(!activityInMemory)
            {
                dispatch(getActivity(params.id!));
            }
        }
    }, [dispatch, activitiesRegistry, params.id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value} = event.target;
        dispatch(setActivityCommentReducer(value));
    };

    const handleFormSubmit = async () => {

    }

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
                                <p style={{color: 'white', fontSize: '1.0em', opacity: '80%'}}> {moment(activity?.date).format('YYYY-MM-DD')} </p>
                            </Card.Meta>
                            <Card.Description style={{color: 'white', marginTop: '0.6em', fontSize: '1.0em'}}>
                                <p> Hosted by <span style={{fontWeight: 'bold'}}> Sael </span> </p>
                            </Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                        <Card.Description>
                            <Button color='teal'>
                                Join activity
                            </Button>
                            <Button>
                                Cancel attendance
                            </Button>
                            <Button color='orange' style={{float: 'right'}} as={NavLink} to={`/activities/${activity?.id}/edit`}>
                                Manage event
                            </Button>
                        </Card.Description>
                    </Card.Content>

                </Card>

                <Segment.Group divided>
                    <Segment>
                        <Icon name='info' color='teal' /> 
                        <span style={{marginLeft:'1em'}}> {activity?.category} </span>
                    </Segment>

                    <Segment>
                        <Icon name='calendar' color='teal' /> 
                        <span style={{marginLeft:'1em'}}> {moment(activity?.date).format('YYYY-MM-DD')} </span>
                    </Segment>

                    <Segment>
                        <Icon name='location arrow' color='teal' /> 
                        <span style={{marginLeft:'1em'}}> {activity?.city} </span>
                    </Segment>
                </Segment.Group>

                <Segment.Group divided>
                    <Segment inverted color='teal' textAlign='center'>
                        <p color='white'> Chat about this event </p>
                    </Segment>

                    <Segment>
                        <ActivityComment author='sael' body='This is a nice activity!' time='5:46 PM' />
                        <ActivityComment author='ahmad' body='This is boring guuys' time='3 days ago' />
                        
                    </Segment>

                    <Segment clearing>
                        
                        <Form onSubmit={handleFormSubmit} autoComplete="off">
                        
                            <Form.Field control={TextArea} placeholder='Write a comment here' name='comment' value={activityComment} type="textarea"
                                        onChange={handleInputChange}/>

                            <Button primary floated="left" type='submit' loading={submitting}> <Icon name='reply'/>Add Reply</Button>
                        </Form>
                    

                    </Segment>
                </Segment.Group>

            </GridColumn>

            <GridColumn width={6}>

                <ActivityAttendanceInfo />

            </GridColumn>

        </Grid>
    </Container>
    
    );
}
