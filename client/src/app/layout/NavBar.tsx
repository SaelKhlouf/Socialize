import {Button, Container, Image, Menu} from "semantic-ui-react";
import {Fragment} from 'react';
import { clearActivityReducer } from "../../features/activities/activitiesReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { NavLink } from "react-router-dom";

export default function NavBar() {

    const dispatch = useDispatch<AppDispatch>();

    const handleOpenEditActivityForm = () => {
        dispatch(clearActivityReducer());
    }

    let activeStyle = {
        textDecoration: "underline"
    };

    return (
        <Fragment>
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item header>
                        <Image src='/assets/logo.png' size='mini' style={{marginRight: '1.5em'}}/>
                        The social app
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/activities/" style={({ isActive } : {isActive: boolean}) => isActive ? activeStyle : undefined}>Activities</Menu.Item>
                    <Menu.Item>
                        <Button as={NavLink} to="create" style={({ isActive } : {isActive: boolean}) => isActive ? activeStyle : undefined} primary onClick={handleOpenEditActivityForm}>Create Activity</Button>
                    </Menu.Item>
                </Container>
            </Menu>
        </Fragment>
    )
}
