import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image } from "semantic-ui-react";

export default function HomePageComponent() {
    return (
        <Fragment>
         <div className='masthead'>
            <Container text textAlign='center'>
                <Header as='h1' > 
                    <Image src='/assets/logo.png' size='massive' style={{marginBottom: '1.2em'}}/> 
                    <span style={{color: 'white'}}> Reactivities </span>
                </Header>

                <Header as='h2' style={{marginTop: '0'}} >
                    <span style={{color: 'white'}}> Welcome to Reactivities </span>
                </Header>

                <Header as='h2' >
                    <Button inverted as={Link} to="/activities"> Take me to the activities! </Button>
                </Header>
            </Container>
         </div>
        </Fragment>
    )
}