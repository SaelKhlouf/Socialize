import { Formik, Form } from "formik";
import { Button, Header, Modal, Segment } from "semantic-ui-react";
import { setModalVisibilityReducer, setSubmittingReducer } from "../../common/commonReducer";
import { CustomTextInput } from "../../common/form/CustomTextInput";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/redux/store";
import { useEffect } from "react";
import { RootState } from "../../app/redux/rootReducer";
import { UserLoginRequest } from "./models";
import { login } from "./usersReducer";
import { useNavigate } from "react-router";

export function Login(){
    const dispatch = useDispatch<AppDispatch>();
    let navigate = useNavigate();
    
    let {showModal, submitting} = useSelector((state: RootState) => state.common);

    useEffect(()=>{
        dispatch(setModalVisibilityReducer(true));
    }, [])

    const initialLoginForm: UserLoginRequest = {
        email: '',
        password: ''
    };

    const formValidationSchema = Yup.object({
        email: Yup.string()
            .email('Must be valid email')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password must contain Latin letters.')
            .required('Required')
    });

    const onFormSubmit = async (values: UserLoginRequest) => {
        const {token} = await dispatch(login(values)).unwrap();
        window.localStorage.setItem('jwt', token);

        dispatch(setSubmittingReducer(false));
        dispatch(setModalVisibilityReducer(false));

        navigate('/activities');
    };
    
    return (
        <Segment clearing>
            <Modal
                open={showModal}
                onClose={() => dispatch(setModalVisibilityReducer(true))}
            >
                <Modal.Header style={{textAlign: 'center'}}>
                    <Header as='h2' color='teal'>Login Form</Header>
                </Modal.Header>

                <Modal.Content>
                    <Formik initialValues={initialLoginForm} validationSchema={formValidationSchema} onSubmit={onFormSubmit} enableReinitialize>
                        {formik => (
                            <Form className='ui form' autoComplete="off">
                                <CustomTextInput name='email' label='Email' placeholder='email' />
                                <CustomTextInput name='password' label='Password' placeholder='password' type='password' />
                                
                                <div style={{textAlign: 'center'}}>
                                    <Button 
                                    disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                                    primary 
                                    type='submit'
                                    submitting={submitting}
                                     >
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Content>
            </Modal>
        </Segment>
    )
}