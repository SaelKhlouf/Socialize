import {Button, Card, Image} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { getActivity, selectActivityAction, setActivityEditModeAction } from "../activitiesReducer";
import { RootState } from "../../../app/redux/rootReducer";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function ActivityDetails() {
    const dispatch = useDispatch<AppDispatch>();

    const selectedActivity = useSelector((state: RootState) => state.activities.selectedActivity);
    const activities = useSelector((state: RootState) => state.activities.activities);
    const submitting = useSelector((state: RootState) => state.activities.submitting);
    const loading = useSelector((state: RootState) => state.activities.loading);

    const handleCancelActivity = () => {
        dispatch(selectActivityAction(undefined));
    }

    const handleOpenEditActivityForm = () => {
        dispatch(setActivityEditModeAction(true));
    }

    let params = useParams();

    useEffect(() => {
        const activityInMemory = activities.find(a => a.id === params.id);
        if(!activityInMemory && params.id)
        {
            console.log('get activity from api ' + params.id);
            dispatch(getActivity(params.id!));
        }
    }, [dispatch, activities, params.id]);

    if(loading){
        return <LoadingComponent content={"Loading"} inverted={true} active={true}></LoadingComponent>;
    }
    
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity?.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{selectedActivity?.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{selectedActivity?.city}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity?.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color='green' onClick={handleOpenEditActivityForm} as={NavLink} to={`/activities/${selectedActivity?.id}/edit`}>
                        Edit
                    </Button>
                    <Button basic color='red' onClick={handleCancelActivity} as={NavLink} to="/activities/">
                        Cancel
                    </Button>
                </Button.Group>
            </Card.Content>
        </Card>
    );
}
