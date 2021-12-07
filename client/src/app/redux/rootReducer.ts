import { combineReducers } from "@reduxjs/toolkit";
import { commonReducer } from "../../common/commonReducer";
import { activitiesReducer } from "../../features/activities/activitiesReducer";
import { usersReducer } from "../../features/users/usersReducer";

const rootReducer = combineReducers({
    activities: activitiesReducer,
    users: usersReducer,
    common: commonReducer,
});
  
export type RootState = ReturnType<typeof rootReducer>;
  
export default rootReducer;