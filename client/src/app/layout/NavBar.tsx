import {Button, Container, Dropdown, Image, Menu} from "semantic-ui-react";
import {Fragment} from 'react';
import { clearActivityReducer } from "../../features/activities/reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutReducer } from "../../features/users/reducer";
import { LOCAL_STORAGE_KEYS } from "../../common/constants";
import { RootState } from "../redux/rootReducer";

export default function NavBar() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    
    let {currentUser} = useSelector((state: RootState) => state.users);

    const handleOpenEditActivityForm = () => {
        dispatch(clearActivityReducer());
    }
    const handleLogout = () => {
        dispatch(logoutReducer());
        navigate('/');
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

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Image src={currentUser.thumbnail} alt='/assets/user.png' size='mini' inline circular style={{marginRight: '1em'}}/>
                            <p>{currentUser.displayName}</p>
                        </Menu.Item>

                        <Dropdown item>
                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to= {`/accounts/${currentUser.id}/profile`}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Container>
            </Menu>
        </Fragment>
    )
}

