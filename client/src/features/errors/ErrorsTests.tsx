import { AxiosError } from "axios";
import { Fragment } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Segment } from "semantic-ui-react";
import { Requests } from "../../app/api/agent";
import NavBar from "../../app/layout/NavBar";

export function ErrorsTests(){
    let navigate = useNavigate();

    const handleValidationBadRequest = async () => {
        try{
            await Requests.post('/activities', {});
        }catch(err: any){
            const {message, errors, details} = err.response.data;
            
        }
    }
    const handleBadRequest = async () => {
        await Requests.get('/ErrorsTests/bad-request');
    }
    const handleInternalServerError = async () => {
        await Requests.get('/ErrorsTests/server-error');
    }
    const handleNotFoundError = async () => {
        try{
            await Requests.get('/ErrorsTests/not-found');
        }catch(err){
            navigate('/not-found');
        }
    }
    const handleAuthenticationError = async () => {
        await Requests.get('/ErrorsTests/authenticate-error');
    }

    return (
        <Container style={{marginTop: '6em'}}>
        <Fragment>   
            <NavBar/>
            <Segment textAlign='center' style={{height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div>
                    <Button primary onClick={handleValidationBadRequest}>Validation Bad Request</Button>
                    <Button primary onClick={handleBadRequest}>Bad Request</Button>
                    <Button primary onClick={handleInternalServerError}>Internal server error</Button>
                    <Button primary onClick={handleNotFoundError}>Not found</Button>
                    <Button primary onClick={handleAuthenticationError}>Authentication error</Button>
                </div>
            </Segment>
        </Fragment>
    </Container>
    )
}