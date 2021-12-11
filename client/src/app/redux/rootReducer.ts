import { combineReducers } from "@reduxjs/toolkit";
import { commonReducer } from "../../common/reducer";
import { activitiesReducer } from "../../features/activities/reducer";
import { usersReducer } from "../../features/users/reducer";

const rootReducer = combineReducers({
    activities: activitiesReducer,
    users: usersReducer,
    common: commonReducer,
});
  
export type RootState = ReturnType<typeof rootReducer>;
  
export default rootReducer;