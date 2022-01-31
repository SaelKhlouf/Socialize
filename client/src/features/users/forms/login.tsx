import { Formik, Form } from "formik";
import { Button } from "semantic-ui-react";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../app/redux/rootReducer";
import { AppDispatch } from "../../../app/redux/store";
import { setModalInfoReducer } from "../../../common/reducer";
import { CustomTextInput } from "../../../common/form/CustomTextInput";
import { UserLoginRequest } from "../models";
import { fetchCurrentUserInfo, login } from "../reducer";
import ErrorContainer from "../../../common/containers/ErrorContainer";
import { useState } from "react";
import { LOCAL_STORAGE_KEYS } from "../../../common/constants";

export function Login(){
    const dispatch = useDispatch<AppDispatch>();
    let navigate = useNavigate();
    
    let {modalInfo} = useSelector((state: RootState) => state.common);

    const [submitting, setSubmitting] = useState<boolean>(false);
    
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

    const onFormSubmit = async (userLoginRequest: UserLoginRequest) => {
        try{
            setSubmitting(true);
            
            const {token} = await dispatch(login(userLoginRequest)).unwrap();
            window.localStorage.setItem(LOCAL_STORAGE_KEYS.JWT, token);
            
            await dispatch(fetchCurrentUserInfo()).unwrap();
            dispatch(setModalInfoReducer({
                showModal: false
            }));
            navigate('/activities');
        }catch(err: any){
            dispatch(setModalInfoReducer({
                submissionErrors: err.message
            }));
        }finally{
            setSubmitting(false);
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