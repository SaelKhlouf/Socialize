import { Item, Label } from "semantic-ui-react";
import { User } from "../../users/models";

interface Props {
    attendee: User;
    host: User;
}

export function ActivityAttendanceInfoRow({attendee, host}: Props){
    return (
        <Item.Group> 
            <Item>
                {
                    attendee.id === host.id && (
                        <Label color='orange' ribbon='right' style={{ position: 'absolute' }}>
                            Host
                        </Label>
                    )
                }

                <Item.Image src={`/assets/user.png`} size='tiny' inline/>
                <Item.Content>
                    <Item.Header as='h2'>
                        {attendee.displayName}
                    </Item.Header>
                    <Item.Meta style={{marginTop: '0.1em'}}>
                        Following
                    </Item.Meta>
                </Item.Content>
            </Item>
        </Item.Group>
    )}