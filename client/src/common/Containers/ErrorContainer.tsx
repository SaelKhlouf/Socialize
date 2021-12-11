import { List, Message } from "semantic-ui-react";

interface Props {
    errors: string | null;
}

export default function ErrorContainer({errors}: Props){

    return (
        <Message negative>
            <Message.Header>Submission errors</Message.Header>
            <List bulleted>
                <List.Item> {errors} </List.Item>
            </List>
        </Message>
     )
}