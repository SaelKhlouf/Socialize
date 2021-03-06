import {Fragment, useEffect} from "react";
import {Container} from "semantic-ui-react";
import Dashboard from "../../features/activities/dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import ActivityForm from "../../features/activities/dashboard/ActivityForm";
import ActivityDetails from "../../features/activities/dashboard/ActivityDetails";
import HomePageComponent from "./homepage";
import { NotFound } from "../../features/errors/NotFound";
import { ToastContainer } from "react-toastify";
import { ErrorsTests } from "../../features/errors/ErrorsTests";
import NavBar from "./navbar";
import { LOCAL_STORAGE_KEYS } from "../../common/constants";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import Profile from "../../features/users/profiles/profile";
import { fetchCurrentUserInfo } from "../../features/users/reducer";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const jwt = window.localStorage.getItem(LOCAL_STORAGE_KEYS.JWT);
        console.log('jwt ' + jwt);
        if(jwt){
            dispatch(fetchCurrentUserInfo());
        }
    }, [dispatch]);

    return (
        <Fragment>
            <ToastContainer position="top-center"/>

                <Routes>
                    <Route path="" element={ <HomePageComponent />} />

                    <Route path="not-found" element={<NotFound />} />

                    <Route path="errors-test" element={ <ErrorsTests />} />

                    <Route path="activities/*" element={
                        <Container style={{marginTop: '6em'}}>
                        <Fragment>   
                            <NavBar/>
                            <Routes>
                                <Route path="" element={ <Dashboard />} />
                                <Route path="create" element={<ActivityForm />} />
                                <Route path=":id" element={<ActivityDetails />} />
                                <Route path=":id/edit" element={<ActivityForm />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Fragment>
                        </Container>
                    } />

                    <Route path="accounts/*" element={
                        <Container style={{marginTop: '6em'}}>
                        <Fragment>   
                            <NavBar/>
                            <Routes>
                                <Route path=":id/profile" element={ <Profile />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Fragment>
                        </Container>
                    } />

                    <Route path="*" element={<NotFound />} />
                   
                </Routes>
            
        </Fragment>
    );
}

export default App;
