import {Fragment} from "react";
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import Dashboard from "../../features/activities/dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import ActivityForm from "../../features/activities/dashboard/ActivityForm";
import ActivityDetails from "../../features/activities/dashboard/ActivityDetails";
import HomePageComponent from "./HomePageComponent";

function App() {
    return (
        <Fragment>
            <Container style={{marginTop: '6em'}}>
                <Routes>
                    <Route path="" element={ <HomePageComponent />} />
                    <Route path="activities/*" element={
                        <Fragment>   
                            <NavBar/>
                            <Routes>
                                <Route path="" element={ <Dashboard />} />
                                <Route path="create" element={<ActivityForm />} />
                                <Route path=":id" element={<ActivityDetails />} />
                                <Route path=":id/edit" element={<ActivityForm />} />
                            </Routes>
                        </Fragment>
                    } />
                </Routes>
            </Container>
        </Fragment>
    );
}

export default App;
