import { Item, Label } from "semantic-ui-react";

export function ActivityAttendanceInfoRow(){
    return (
        <Item.Group> 
            <Item>
            <Label color='orange' ribbon='right' style={{ position: 'absolute' }}>
                    Host
                </Label>
                <Item.Image src={`/assets/user.png`} size='tiny' inline/>
                <Item.Content>
                    <Item.Header as='h2'>
                        Bob
                    </Item.Header>
                    <Item.Meta style={{marginTop: '0.1em'}}>
                        Following
                    </Item.Meta>
                </Item.Content>
            </Item>
        </Item.Group>
    )}