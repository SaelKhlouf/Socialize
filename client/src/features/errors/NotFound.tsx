import { Fragment } from "react";
import { Button, Container, Icon, Segment } from "semantic-ui-react";
import NavBar from "../../app/layout/NavBar";

export function NotFound(){
    return (
        <Container style={{marginTop: '6em'}}>
            <Fragment>   
                <NavBar/>
                <Segment textAlign='center' style={{height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div>
                        <Icon name='search' />
                        <p>
                            oops - we've looked everywhere and could not find this.
                        </p>
                        <Button primary>Return to activities page</Button>
                    </div>
                </Segment>
            </Fragment>
        </Container>
    )
}