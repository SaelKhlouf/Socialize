import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, Header, Segment} from "semantic-ui-react";
import { createActivity, getActivity, setFormActivityReducer, updateActivity } from "../reducer";
import { AppDispatch } from "../../../app/redux/store";
import { RootState } from "../../../app/redux/rootReducer";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/loading";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { CustomTextInput } from "../../../common/form/CustomTextInput";
import { CustomTextArea } from "../../../common/form/CustomTextArea";
import { CustomDateInput } from "../../../common/form/CustomDateInput";
import { CustomSelectInput } from "../../../common/form/CustomSelectInput";
import { ACTIVITY_CATEGORIES } from "../../../common/constants";
import { EditActivityModel, mapCreateActivityModel } from "../models";

export default function ActivityForm() {
    const dispatch = useDispatch<AppDispatch>();
    let navigate = useNavigate();
    let params = useParams();

    let {activitiesRegistry, activity, submitting, loading} = useSelector((state: RootState) => state.activities);

    const formValidationSchema = Yup.object({
        title: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .required('Required'),
        description: Yup.string()
            .max(200, 'Must be 200 characters or less')
            .required('Required'),
        category: Yup.string()
            .required('Required'),
        date: Yup.string()
            .required('Required')
            .nullable(),
        city: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .required('Required'),
        venue: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .required('Required'),
    });

    const onFormSubmit = async (editActivityModel: EditActivityModel) => {
        if(editActivityModel.id){
            await dispatch(updateActivity(editActivityModel));
            navigate(`/activities/${editActivityModel.id}`);
        }else{
            const createActivityModel = mapCreateActivityModel(editActivityModel);
            const data = await dispatch(createActivity(createActivityModel)).unwrap();
            navigate(`/activities/${data.id}`);
        }
    };


    useEffect(() => {
        const handleFetchActivity = async () => {
            const data = activitiesRegistry[params.id!];
            if(!data)
            {
                await dispatch(getActivity(params.id!));
            }
            
            dispatch(setFormActivityReducer(params.id!));
        };

        handleFetchActivity();
    }, [activitiesRegistry, dispatch, params.id]);

    const initialActivityValues: EditActivityModel = {
        id: '',
        title: '',
        description: '',
        category: '',
        date: new Date(),
        city: '',
        venue: ''
    };

    if(loading){
        return <LoadingComponent content={"Loading"} inverted={true} active={true}></LoadingComponent>;
    }

    return (
        <Segment clearing>
            <Formik initialValues={activity ?? initialActivityValues} validationSchema={formValidationSchema} onSubmit={onFormSubmit} enableReinitialize>
                {formik => (
                        <Form className='ui form' autoComplete="off">
                            <Header as='h4' color='teal' content='Activity Details' />

                            <CustomTextInput name='title' label='Title' placeholder='title' />
                            <CustomTextArea name='description' label='Description' placeholder='description' rows={3} />
                            <CustomSelectInput name='category' label='Category' placeholder='category' options={ACTIVITY_CATEGORIES} />
                            <CustomDateInput 
                                name='date' 
                                label='Date' 
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput={true}
                            />

                            <Header as='h4' color='teal' content='Activity Location' />
                            <CustomTextInput name='city' label='City' placeholder='city' />
                            <CustomTextInput name='venue' label='Venue' placeholder='venue' />

                            <Button disabled={!formik.isValid || !formik.dirty || formik.isSubmitting} primary floated="right" type='submit' loading={submitting}>Submit</Button>
                            <Button secondary floated="left" type='button' as={NavLink} to={activity?.id ? `/activities/${activity?.id}` : '/activities'}>
                                Cancel
                            </Button>

                        </Form>
                    )
                }
            </Formik>
        </Segment>
    );
}