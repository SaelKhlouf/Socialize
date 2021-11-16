import {Activity} from "../../../app/models/activity";
import {Button, Card, Image} from "semantic-ui-react";

interface Props {
    activity: Activity;
    handleCancelActivity: () => void;
    handleOpenEditActivityForm: () => void;
    submitting: boolean;
}

export default function ActivityDetails({activity, handleCancelActivity, handleOpenEditActivityForm, submitting}: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.city}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color='green' loading={submitting} onClick={handleOpenEditActivityForm}>
                        Edit
                    </Button>
                    <Button basic color='red' onClick={handleCancelActivity}>
                        Cancel
                    </Button>
                </Button.Group>
            </Card.Content>
        </Card>
    );
}