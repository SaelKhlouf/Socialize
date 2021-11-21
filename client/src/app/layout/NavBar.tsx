import {Button, Container, Image, Menu} from "semantic-ui-react";
import {Fragment} from 'react';
import { clearSelectedActivityAction } from "../../features/activities/activitiesReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

export default function NavBar() {

    const dispatch = useDispatch<AppDispatch>();

    const handleOpenEditActivityForm = () => {
        dispatch(clearSelectedActivityAction());
    }

    return (
        <Fragment>
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item header>
                        <Image src='/assets/logo.png' size='mini' style={{marginRight: '1.5em'}}/>
                        The social app
                    </Menu.Item>
                    <Menu.Item>Activities</Menu.Item>
                    <Menu.Item>
                        <Button primary onClick={handleOpenEditActivityForm}>Create Activity</Button>
                    </Menu.Item>
                </Container>
            </Menu>
        </Fragment>
    )
}
