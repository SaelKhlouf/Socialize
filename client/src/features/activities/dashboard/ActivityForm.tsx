import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, Form, Input, Segment, TextArea} from "semantic-ui-react";
import { createActivity, getActivity, setActivityReducer, updateActivity } from "../activitiesReducer";
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
        dispatch(setActivityReducer({
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

    let params = useParams();

    const loading = useSelector((state: RootState) => state.activities.loading);

    useEffect(() => {
        if(!activity && params.id)
        {
            dispatch(getActivity(params.id!));
        }
    }, [dispatch, activity, params.id]);

    if(loading){
        return <LoadingComponent content={"Loading"} inverted={true} active={true}></LoadingComponent>;
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleFormSubmit} autoComplete="off">
            
                <Form.Field control={Input} placeholder='Title' name='title' value={activity.title}
                        onChange={handleInputChange}/>
        
        
                <Form.Field control={TextArea} placeholder='Description' name='description' value={activity.description}
                            onChange={handleInputChange}/>
            
                <Form.Field control={Input} placeholder='Category' name='category' value={activity.category}
                        onChange={handleInputChange}/>
        
                <Form.Field control={Input} placeholder='Date' name='date' value={activity.date} type = "date"
                        onChange={handleInputChange}/>
        
                <Form.Field control={Input} placeholder='City' name='city' value={activity.city}
                        onChange={handleInputChange}/>
        
                <Form.Field control={Input} placeholder='Venue' name='venue' value={activity.venue}
                        onChange={handleInputChange}/>
        

                <Button primary floated="right" type='submit' loading={submitting}>Submit</Button>
                <Button secondary floated="left" type='button' as={NavLink} to={`/activities/${activity.id}`}>
                    Cancel
                </Button>
            </Form>
        </Segment>
    );
}