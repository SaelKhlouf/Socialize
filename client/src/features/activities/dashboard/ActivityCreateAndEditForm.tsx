import React from "react";
import {Button, Form, Segment, TextArea} from "semantic-ui-react";

interface Props {
    handleCancelEditActivityForm: () => void;
}

export default function ActivityCreateAndEditForm({handleCancelEditActivityForm}: Props) {
    return (
        <Segment clearing>
            <Form>
                <Form.Field>
                    <input placeholder='Title'/>
                </Form.Field>
                <Form.Field>
                    <TextArea placeholder='Description'/>
                </Form.Field>
                <Form.Field>
                    <input placeholder='Category'/>
                </Form.Field>
                <Form.Field>
                    <input placeholder='Date'/>
                </Form.Field>
                <Form.Field>
                    <input placeholder='City'/>
                </Form.Field>
                <Form.Field>
                    <input placeholder='Venue'/>
                </Form.Field>

                <Button primary floated="right" type='submit'>Submit</Button>
                <Button secondary floated="left" type='button' onClick={handleCancelEditActivityForm}>Cancel</Button>
            </Form>
        </Segment>
    );
}