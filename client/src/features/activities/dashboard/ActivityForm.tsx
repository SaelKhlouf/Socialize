import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, Form, Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity";
import { createActivity, setActivityAction, setActivityEditModeAction, updateActivity } from "../activitiesReducer";
import { AppDispatch } from "../../../app/redux/store";
import { RootState } from "../../../app/redux/rootReducer";


export default function ActivityForm() {
    const dispatch = useDispatch<AppDispatch>();

    const activity = useSelector((state: RootState) => state.activities.activity);
    const submitting = useSelector((state: RootState) => state.activities.submitting);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        const data = activity ?? {
            id: '',
            title: '',
            description: '',
            category: '',
            date: '',
            city: '',
            venue: '',
        };
        
        dispatch(setActivityAction({
            ...data,
            [name]: value
        }));
    };

    const handleFormSubmit = async (activity: Activity) => {
        if(activity?.id != null){
            dispatch(createActivity(activity));
        }else{
            dispatch(updateActivity(activity));
        }
    }

    const handleCancelEditActivityForm = () => {
        dispatch(setActivityEditModeAction(false));
    }

    return (
        <Segment clearing>
            <Form onSubmit={() => handleFormSubmit(activity)} autoComplete="off">
            
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
                <Button secondary floated="left" type='button' onClick={handleCancelEditActivityForm}>Cancel</Button>
            </Form>
        </Segment>
    );
}