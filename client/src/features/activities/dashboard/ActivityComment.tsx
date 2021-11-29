import { Link } from "react-router-dom";
import { Item } from "semantic-ui-react";

interface ActivityCommentProps{
    author: string;
    body: string;
    time: string;
}

export function ActivityComment({author, body, time}: ActivityCommentProps){
    return (
        <Item.Group> 
            <Item>
                <Item.Image src={`/assets/user.png`} size='mini' inline/>
                <Item.Content>
                    <Item.Header as='h2'>
                        {author}
                        <span style={{color: 'grey', fontSize: '0.7em', marginLeft: '0.5em'}}> {time}</span>
                    </Item.Header>
                    <Item.Meta style={{marginTop: '0.1em'}}>
                        {body}
                    </Item.Meta>
                    <Link to=''> Reply </Link>
                </Item.Content>
            </Item>
        </Item.Group>
    )}