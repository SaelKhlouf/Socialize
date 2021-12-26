import { Button, Grid, Item, Segment, Statistic } from "semantic-ui-react";
import { User } from "../models";

interface Props {
    currentUser: User;
}

export default function ProfileHeader({currentUser}: Props){
    return (

        <Segment>
            <Grid>
                <Grid.Column width={11}>
                    <Item.Group>
                        <Item>
                            <Item.Image size='small' circular src={currentUser.thumbnail ?? `/assets/user.png`}  />

                            <Item.Content verticalAlign='middle'>
                                <Item.Header>
                                {currentUser.displayName}
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>

                <Grid.Column width={5}>
                    <Segment vertical>
                        <Statistic.Group widths={2} >
                                <Statistic>
                                    <Statistic.Value>8</Statistic.Value>
                                    <Statistic.Label>Followers</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>75</Statistic.Value>
                                    <Statistic.Label>Following</Statistic.Label>
                                </Statistic>
                        </Statistic.Group>
                    </Segment>
                    
                    <Segment vertical>
                        <Button color='teal' fluid>Following</Button>    
                    </Segment>
                </Grid.Column>
            </Grid>
        </Segment>

        

    );
}