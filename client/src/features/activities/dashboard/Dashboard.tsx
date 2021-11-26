import {ActivitiesList} from "./ActivitiesList";
import {Grid, GridColumn} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/redux/rootReducer";
import { AppDispatch } from "../../../app/redux/store";
import { useEffect } from "react";
import { getActivities } from "../activitiesReducer";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.activities.loading);
    const activitiesRegistry = useSelector((state: RootState) => state.activities.activitiesRegistry);

    useEffect(() => {
        if(activitiesRegistry.size === 0){
            dispatch(getActivities());
        }
    }, [dispatch]);

    if(loading){
        return <LoadingComponent content={"Loading"} inverted={true} active={true}></LoadingComponent>;
    }
    return (
        <Grid>
            <GridColumn width={16}>
                <ActivitiesList />
            </GridColumn>
        </Grid>
    );
}