import {Button, Container, Image, Menu} from "semantic-ui-react";
import React, {Fragment} from 'react';

interface Props {
    handleOpenEditActivityForm: () => void;
}

export default function NavBar({handleOpenEditActivityForm}: Props) {
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