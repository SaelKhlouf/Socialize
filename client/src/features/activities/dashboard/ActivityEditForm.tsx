import React from "react";
import {Button, Form, Segment, TextArea} from "semantic-ui-react";

export default function ActivityEditForm() {
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
                    <input placeholder='City'/>
                </Form.Field>
                <Form.Field>
                    <input placeholder='Venue'/>
                </Form.Field>

                <Button primary floated="right" type='submit'>Submit</Button>
                <Button secondary floated="left" type='button'>Cancel</Button>
            </Form>
        </Segment>
    );
}