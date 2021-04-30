import {Button, Container, Image, Menu} from "semantic-ui-react";
import React, {Fragment} from 'react';

export default function NavBar() {
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
                        <Button primary>Create Activity</Button>
                    </Menu.Item>
                </Container>
            </Menu>
        </Fragment>
    )
}