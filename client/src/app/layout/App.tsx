import {Fragment, useEffect} from "react";
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import Dashboard from "../../features/activities/dashboard/Dashboard";
import LoadingComponent from "./LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../features/activities/activitiesReducer";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/rootReducer";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.activities.loading);

    useEffect(() => {
        dispatch(getActivities());
    }, [dispatch]);

    if(loading){
        return <LoadingComponent content={"Loading"} inverted={true} active={true}></LoadingComponent>;
    }
    return (
        <Fragment>
            <NavBar/>
            <Container style={{marginTop: '8em'}}>
                <Dashboard />
            </Container>
        </Fragment>
    );
}

export default App;
