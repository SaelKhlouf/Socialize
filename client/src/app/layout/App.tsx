import {Fragment} from "react";
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import Dashboard from "../../features/activities/dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import ActivityForm from "../../features/activities/dashboard/ActivityForm";
import ActivityDetails from "../../features/activities/dashboard/ActivityDetails";

function App() {
    return (
        <Fragment>
            <NavBar/>
            <Container style={{marginTop: '8em'}}>
                <Routes>
                    <Route path="activities" element={ <Dashboard />} />
                    <Route path="activities/create" element={<ActivityForm />} />
                    <Route path="activities/:id" element={<ActivityDetails />} />
                    <Route path="activities/:id/edit" element={<ActivityForm />} />
                </Routes>
            </Container>
        </Fragment>
    );
}

export default App;
