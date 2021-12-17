import {Container, Grid, GridColumn} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/redux/rootReducer";
import { AppDispatch } from "../../../app/redux/store";
import { useEffect } from "react";
import { getActivities } from "../reducer";
import LoadingComponent from "../../../app/layout/loading";
import { ActivitiesList } from "./ActivitiesList";
import { ActivitiesListFilters } from "./ActivitiesListFilters";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.activities.loading);

    useEffect(() => {
        dispatch(getActivities());
    }, [dispatch]);

    if(loading){
        return <LoadingComponent content={"Loading"} inverted={true} active={true}></LoadingComponent>;
    }
    return (
        <Container>
            <Grid>
                <GridColumn width={10}>
                    <ActivitiesList /> 
                </GridColumn>
                <GridColumn width={6}>
                    <ActivitiesListFilters />
                </GridColumn>
            </Grid>
        </Container>
    );
}