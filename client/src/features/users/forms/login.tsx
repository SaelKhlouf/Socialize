import { Formik, Form } from "formik";
import { Button } from "semantic-ui-react";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../app/redux/rootReducer";
import { AppDispatch } from "../../../app/redux/store";
import { setModalInfoReducer, setSubmittingReducer } from "../../../common/reducer";
import { CustomTextInput } from "../../../common/form/CustomTextInput";
import { User, UserLoginRequest } from "../models";
import { login, loginReducer } from "../reducer";
import ErrorContainer from "../../../common/Containers/ErrorContainer";
import { LOCAL_STORAGE_KEYS } from "../../../common/constants";
import jwtDecode from "jwt-decode";

export function Login(){
    const dispatch = useDispatch<AppDispatch>();
    let navigate = useNavigate();
    
    let {submitting, modalInfo} = useSelector((state: RootState) => state.common);

    const initialLoginForm = {
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
        try{
            const data = await dispatch(login(values)).unwrap(); //if error happened in the thunk, then the code below will not execute

            window.localStorage.setItem(LOCAL_STORAGE_KEYS.JWT, data.token);
            const user = jwtDecode<User>(data.token);
            dispatch(loginReducer(user));

            dispatch(setSubmittingReducer(false));
            dispatch(setModalInfoReducer({
                showModal: false
            }));
            navigate('/activities');
        }catch(err: any){
            dispatch(setModalInfoReducer({
                submissionErrors: err.message
            }));
        }
    };
    
    return (
            <Formik initialValues={initialLoginForm} validationSchema={formValidationSchema} onSubmit={onFormSubmit} enableReinitialize>
                {formik => (
                    <Form className='ui form' autoComplete="off">
                        <CustomTextInput name='email' label='Email' placeholder='email'/>
                        <CustomTextInput name='password' label='Password' placeholder='password' type='password' />

                        {
                            modalInfo.submissionErrors && modalInfo.submissionErrors.length !== 0 &&
                            <ErrorContainer errors={modalInfo.submissionErrors} />
                        }
                        
                        <Button 
                            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                            primary 
                            type='submit'
                            loading={submitting}
                            fluid
                            >
                                Login
                        </Button>
                    </Form>
                )}
            </Formik>
    )
}