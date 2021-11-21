import { combineReducers } from "@reduxjs/toolkit";
import { activitiesReducer } from "../../features/activities/activitiesReducer";

const rootReducer = combineReducers({
    activities: activitiesReducer
});
  
export type RootState = ReturnType<typeof rootReducer>;
  
export default rootReducer;