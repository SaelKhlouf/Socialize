import {Button, Card, Image} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { selectActivityAction, setActivityEditModeAction } from "../activitiesReducer";
import { RootState } from "../../../app/redux/rootReducer";

export default function ActivityDetails() {
    const dispatch = useDispatch<AppDispatch>();

    const selectedActivity = useSelector((state: RootState) => state.activities.selectedActivity);
    const submitting = useSelector((state: RootState) => state.activities.submitting);

    const handleCancelActivity = () => {
        dispatch(selectActivityAction(undefined));
    }

    const handleOpenEditActivityForm = () => {
        dispatch(setActivityEditModeAction(true));
    }

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity?.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{selectedActivity?.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{selectedActivity?.city}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity?.description}
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