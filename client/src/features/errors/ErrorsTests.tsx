import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Container, Message, Segment } from "semantic-ui-react";
import { isForInStatement } from "typescript";
import { Requests } from "../../app/api/agent";
import NavBar from "../../app/layout/NavBar";
import { RootState } from "../../app/redux/rootReducer";
import { AppDispatch } from "../../app/redux/store";
import { setValidationErrorsReducer } from "../activities/activitiesReducer";

export function ErrorsTests(){
    let navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    let validationErrors = useSelector((state: RootState) => state.activities.validationErrors);
    
    const handleValidationBadRequest = async () => {
        try{
            await Requests.post('/activities', {});
        }catch(err: any){
            const {message, errors} = err.response.data;
            dispatch(setValidationErrorsReducer(errors));
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
            <Segment.Group>
                
                <Segment textAlign='center' style={{height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div>
                        <Button primary onClick={handleValidationBadRequest}>Validation Bad Request</Button>
                        <Button primary onClick={handleBadRequest}>Bad Request</Button>
                        <Button primary onClick={handleInternalServerError}>Internal server error</Button>
                        <Button primary onClick={handleNotFoundError}>Not found</Button>
                        <Button primary onClick={handleAuthenticationError}>Authentication error</Button>
                    </div>

                
                </Segment>

                {
                    validationErrors && validationErrors.length > 0 &&

                    <Segment secondary>
                            <Message
                                error
                                header='There was some errors with your submission'
                                list={validationErrors}
                            />
                    </Segment>
                }
            </Segment.Group>
        </Fragment>
    </Container>
    )
}