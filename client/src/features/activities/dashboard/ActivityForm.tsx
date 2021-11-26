import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, Form, Segment} from "semantic-ui-react";
import { createActivity, getActivity, setActivityAction, setActivityEditModeAction, updateActivity } from "../activitiesReducer";
import { AppDispatch } from "../../../app/redux/store";
import { RootState } from "../../../app/redux/rootReducer";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";


export default function ActivityForm() {
    const dispatch = useDispatch<AppDispatch>();

    let activity = useSelector((state: RootState) => state.activities.activity);
    const submitting = useSelector((state: RootState) => state.activities.submitting);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        dispatch(setActivityAction({
            ...activity,
            [name]: value
        }));
    };

    let navigate = useNavigate();

    const handleFormSubmit = async () => {
        if(activity.id){
            await dispatch(updateActivity(activity));
            navigate(`/activities/${activity.id}`);
        }else{
           const data = await dispatch(createActivity(activity)).unwrap();
           navigate(`/activities/${data.id}`);
        }
    }

    const handleCancelEditActivityForm = () => {
        dispatch(setActivityEditModeAction(false));
    }

    let params = useParams();

    const selectedActivity = useSelector((state: RootState) => state.activities.selectedActivity);
    const loading = useSelector((state: RootState) => state.activities.loading);

    useEffect(() => {
        if(!selectedActivity && params.id)
        {
            dispatch(getActivity(params.id!));
        }
    }, [dispatch, selectedActivity, params.id]);

    if(loading){
        return <LoadingComponent content={"Loading"} inverted={true} active={true}></LoadingComponent>;
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleFormSubmit} autoComplete="off">
            
                <Form.Input placeholder='Title' name='title' value={activity.title}
                        onChange={handleInputChange}/>
        
        
                <Form.Input placeholder='Description' name='description' value={activity.description}
                            onChange={handleInputChange}/>
            
                <Form.Input placeholder='Category' name='category' value={activity.category} type="textarea"
                        onChange={handleInputChange}/>
        
                <Form.Input placeholder='Date' name='date' value={activity.date} type = "date"
                        onChange={handleInputChange}/>
        
                <Form.Input placeholder='City' name='city' value={activity.city}
                        onChange={handleInputChange}/>
        
                <Form.Input placeholder='Venue' name='venue' value={activity.venue}
                        onChange={handleInputChange}/>
        

                <Button primary floated="right" type='submit' loading={submitting}>Submit</Button>
                <Button secondary floated="left" type='button' onClick={handleCancelEditActivityForm} as={NavLink} to={`/activities/${activity.id}`}>
                    Cancel
                </Button>
            </Form>
        </Segment>
    );
}