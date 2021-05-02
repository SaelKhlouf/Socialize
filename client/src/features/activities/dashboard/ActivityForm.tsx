import React, {useState} from "react";
import {Button, Form, Segment, TextArea} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity";

interface Props {
    handleCancelEditActivityForm: () => void;
    selectedActivity: Activity | undefined;
    handleFormSubmit: (activity: Activity) => void;
}

export default function ActivityForm({
                                                      selectedActivity,
                                                      handleCancelEditActivityForm,
                                                      handleFormSubmit
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
            <Form>
                <Form.Field>
                    <input placeholder='Title' name='title' value={activity.title}
                           onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <TextArea placeholder='Description' name='description' value={activity.description}
                              onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <input placeholder='Category' name='category' value={activity.category}
                           onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <input placeholder='Date' name='date' value={activity.date}
                           onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <input placeholder='City' name='city' value={activity.city}
                           onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <input placeholder='Venue' name='venue' value={activity.venue}
                           onChange={handleInputChange}/>
                </Form.Field>

                <Button primary floated="right" type='submit' onClick={() => handleFormSubmit(activity)}>Submit</Button>
                <Button secondary floated="left" type='button' onClick={handleCancelEditActivityForm}>Cancel</Button>
            </Form>
        </Segment>
    );
}