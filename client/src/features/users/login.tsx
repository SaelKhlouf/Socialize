import { Formik } from "formik";
import { NavLink } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CustomTextInput } from "../../common/form/CustomTextInput";
import * as Yup from 'yup';

export function Login(){
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

    const onFormSubmit = () => {

    };
    
    return (
        <Segment clearing>
        <Formik initialValues={initialLoginForm} validationSchema={formValidationSchema} onSubmit={onFormSubmit} enableReinitialize>
            {formik => (
                            <Form className='ui form' autoComplete="off">
                                <Header as='h4' color='teal' content='Login' />

                                <CustomTextInput name='email' label='Email' placeholder='email' />
                                <CustomTextInput name='password' label='Password' placeholder='password' type='password' />
                                
                                <Button disabled={!formik.isValid || !formik.dirty || formik.isSubmitting} primary floated="right" type='submit' >Submit</Button>
                                <Button secondary floated="left" type='button' as={NavLink} to=''>
                                    Cancel
                                </Button>

                            </Form>
                        )
            }
        </Formik>
    </Segment>
    )
}