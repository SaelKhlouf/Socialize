import {Fragment} from "react";
import {Container} from "semantic-ui-react";
import NavBar from "./navbar";
import Dashboard from "../../features/activities/dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import ActivityForm from "../../features/activities/dashboard/ActivityForm";
import ActivityDetails from "../../features/activities/dashboard/ActivityDetails";
import HomePageComponent from "./homepage";
import { NotFound } from "../../features/errors/NotFound";
import { ToastContainer } from "react-toastify";
import { ErrorsTests } from "../../features/errors/ErrorsTests";
import { Login } from "../../features/users/login";

function App() {
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

                    <Route path="users/*" element={
                        <Container style={{marginTop: '6em'}}>
                        <Fragment>   
                            <NavBar/>
                            <Routes>
                                <Route path="login" element={ <Login />} />
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
