import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ActivitiesApis } from '../../app/api/agent'
import { Activity } from './models';

export type ActivitiesState = {
    activitiesRegistry: {[key: string]: Activity};
    loading: boolean;
    submitting: boolean;
    activityComment: string;
    activity: Activity | null;
    validationErrors: string[];
}

const initialState : ActivitiesState = {
    activitiesRegistry: {},
    loading: false,
    submitting: false,
    activityComment: '',
    activity: null,
    validationErrors: []
}

export const getActivities = createAsyncThunk('activities/getActivities', ActivitiesApis.list);
export const getActivity = createAsyncThunk('activities/getActivity', ActivitiesApis.details);
export const deleteActivity = createAsyncThunk('activities/deleteActivity', ActivitiesApis.delete);
export const createActivity = createAsyncThunk('activities/createActivity', ActivitiesApis.create);
export const updateActivity = createAsyncThunk('activities/updateActivity', ActivitiesApis.update);

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  // add your non-async reducers here
  reducers: {
    setActivityReducer: (state, action: PayloadAction<Activity>) => {
      state.activity = action.payload;
      return state;
    },
    setActivityCommentReducer: (state, action: PayloadAction<string>) => {
      state.activityComment = action.payload;
      return state;
    },
    clearActivityReducer: (state) => {
      state.activity = null;
      return state;
    },
    setValidationErrorsReducer: (state, action: PayloadAction<string[]>) => {
      state.validationErrors = action.payload;
      return state;
    },
  },
  // add your async reducers in extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(getActivities.pending, (state) => {
        state.loading = true;
        return state;
      })
      .addCase(getActivities.fulfilled, (state, action) => {
        const activitiesMapReducer = (map: {[key: string]: Activity}, activity: Activity) => {
          map[activity.id] = activity;
          return map;
        };
        state.activitiesRegistry = action.payload.data.reduce(activitiesMapReducer, {});
        state.loading = false;
        return state;
      });


    builder
      .addCase(getActivity.pending, (state) => {
        state.loading = true;
        return state;
      });
      builder
      .addCase(getActivity.fulfilled, (state, action) => {
        state.activity = action.payload;
        const {activity, activitiesRegistry} = state;

        if(!activitiesRegistry[activity.id]){
          activitiesRegistry[activity.id] = activity;
        }
        state.loading = false;
        return state;
      });
      

    builder
      .addCase(deleteActivity.fulfilled, (state, action) => {
        const id = action.payload;

        if(state.activitiesRegistry){
          let updatedActivitiesRegistry = {};
          
          Object.keys(state.activitiesRegistry).forEach(key => {
            if(key !== id){
              updatedActivitiesRegistry = {
                ...updatedActivitiesRegistry,
                [key]: state.activitiesRegistry[key]
              }
            }
          });
          state.activitiesRegistry = updatedActivitiesRegistry;

        }
        return state;
      });


    builder
      .addCase(createActivity.pending, (state) => {
        state.submitting = true;
        return state;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
          const createdActivity = action.payload;

          state.activitiesRegistry = state.activitiesRegistry ?? {};
          state.activitiesRegistry[createdActivity.id] = createdActivity;

          state.activity = createdActivity;

          state.submitting = false;
          return state;
      });


      
    builder
      .addCase(updateActivity.pending, (state) => {
        state.submitting = true;
        return state;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
          const updatedActivity = action.payload;

          state.activitiesRegistry = state.activitiesRegistry ?? {};
          state.activitiesRegistry[updatedActivity.id] = updatedActivity;
          state.activity = updatedActivity;
          
          state.submitting = false;
          return state;
      });

  }
})

export const activitiesReducer = activitiesSlice.reducer;

export const {setActivityReducer, clearActivityReducer, setActivityCommentReducer, setValidationErrorsReducer} = activitiesSlice.actions;