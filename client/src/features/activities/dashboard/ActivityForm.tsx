import React, {useState} from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity";

interface Props {
    handleCancelEditActivityForm: () => void;
    selectedActivity: Activity | undefined;
    handleFormSubmit: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({
                                                      selectedActivity,
                                                      handleCancelEditActivityForm,
                                                      handleFormSubmit,
                                                      submitting
                                                  }: Props) {
    const initialActivity = selectedActivity ?? {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: '',
    };
    const [activity, setActivity] = useState<Activity>(initialActivity);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setActivity({
            ...activity,
            [name]: value
        });
    };

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