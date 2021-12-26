import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Container, Header, Image } from "semantic-ui-react";
import { setModalInfoReducer } from "../../common/reducer";
import { LOCAL_STORAGE_KEYS } from "../../common/constants";
import ModalContainer from "../../common/containers/ModalContainer";
import { ModalTypes } from "../../common/models";
import { Login } from "../../features/users/forms/login";
import { Register } from "../../features/users/forms/register";
import { RootState } from "../redux/rootReducer";
import { AppDispatch } from "../redux/store";

export default function HomePageComponent() {
    let navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    let {type, showModal} = useSelector((state: RootState) => state.common.modalInfo);

    useEffect(() => {
        const currentJwt = window.localStorage.getItem(LOCAL_STORAGE_KEYS.JWT);
        if(currentJwt){
            navigate('/activities');
        }
    }, [navigate]);

    return (
        <Fragment>
            {
                showModal && type === ModalTypes.login &&
                (
                    <ModalContainer content={<Login />} title='Login' />
                )
            }

            {
                showModal && type === ModalTypes.register &&
                (
                    <ModalContainer content={<Register />} title='Register' />
                )
            }

            <div className='masthead'>
                <Container text textAlign='center'>
                    <Header as='h1' > 
                        <Image src='/assets/logo.png' size='massive' style={{marginBottom: '0.8em'}}/> 
                        <span style={{color: 'white'}}> Reactivities </span>
                    </Header>

                    <Header as='h2' style={{marginTop: '0'}} >
                        <span style={{color: 'white'}}> Welcome to Reactivities </span>
                    </Header>

                    <Header as='h2' >
                        <Button inverted onClick={() => dispatch(setModalInfoReducer({
                            showModal: true,
                            type: ModalTypes.login
                        }))}> 
                            Login 
                        </Button>

                        <Button inverted onClick={() => dispatch(setModalInfoReducer({
                            showModal: true,
                            type: ModalTypes.register
                        }))}>
                            Register
                        </Button>
                    </Header>
                </Container>
            </div>
        </Fragment>
    )
}