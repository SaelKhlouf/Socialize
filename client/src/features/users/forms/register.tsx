import { Formik, Form } from "formik";
import { Button } from "semantic-ui-react";
import { setModalInfoReducer, setSubmittingReducer } from "../../../common/reducer";
import { CustomTextInput } from "../../../common/form/CustomTextInput";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { RootState } from "../../../app/redux/rootReducer";
import { UserRegisterRequest } from "../models";
import ErrorContainer from "../../../common/containers/ErrorContainer";
import { register } from "../reducer";
import { toast } from "react-toastify";

export function Register(){
    const dispatch = useDispatch<AppDispatch>();

    let {submitting, modalInfo} = useSelector((state: RootState) => state.common);

    const initialLoginForm = {
        userName: '',
        displayName: '',
        email: '',
        password: ''
    };

    const formValidationSchema = Yup.object({
        userName: Yup.string()
            .required('Required'),
        displayName: Yup.string()
            .required('Required'),
        email: Yup.string()
            .email('Must be valid email')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .required('Required')
    });

    const onFormSubmit = async (values: UserRegisterRequest) => {
        try{
            await dispatch(register(values)).unwrap(); 
            dispatch(setModalInfoReducer({
                showModal: false
            }));
            dispatch(setSubmittingReducer(false));
            toast.success('Registration succeeded.');
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
                        <CustomTextInput name='userName' label='Username' placeholder='username' />
                        <CustomTextInput name='displayName' label='Display name' placeholder='display name' />
                        <CustomTextInput name='email' label='Email' placeholder='email' />
                        <CustomTextInput name='password' label='Password' placeholder='password' type='password' />

                            {
                                modalInfo.submissionErrors && modalInfo.submissionErrors.length !== 0 &&
                                <ErrorContainer errors={modalInfo.submissionErrors} />
                            }
                            
                            <div style={{textAlign: 'center'}}>
                                <Button 
                                disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                                primary 
                                type='submit'
                                loading={submitting}
                                >
                                    Register
                                </Button>
                            </div>


                        
                    </Form>
                )}
            </Formik>

    )
}