import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ActivitiesApis } from '../../app/api/agent'
import { RootState } from '../../app/redux/rootReducer';
import { User } from '../users/models';
import { Activity, EditActivityModel, mapEditActivityModel } from './models';

export type ActivitiesState = {
    activitiesRegistry: {[key: string]: Activity};
    loading: boolean;
    submitting: boolean;
    activityComment: string;
    activity: EditActivityModel | null;
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

export const attendActivity = createAsyncThunk<{activityId: string, currentUser: User | null}, string, {state: RootState}>(
  'activities/attendActivity',
  async (id, thunkApi) => {
    ActivitiesApis.attend(id);
    const {users} =  thunkApi.getState();
    return {
      activityId: id,
      currentUser: users.currentUser
    };
});

export const cancelActivityAttendance = createAsyncThunk<{activityId: string, currentUserId?: string}, string, {state: RootState}>(
  'activities/cancelActivityAttendance',
  async (id, thunkApi) => {
    ActivitiesApis.unattend(id);
    const {users} =  thunkApi.getState();
    return {
      activityId: id,
      currentUserId: users.currentUser.id
    };
});

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  // add your non-async reducers here
  reducers: {
    setActivityReducer: (state, action: PayloadAction<EditActivityModel>) => {
      state.activity = action.payload;
      return state;
    },
    setActivityCommentReducer: (state, action: PayloadAction<string>) => {
      state.activityComment = action.payload;
      return state;
    },
    setFormActivityReducer: (state, action: PayloadAction<string>) => {
      const data = state.activitiesRegistry[action.payload];
      if(data){
        state.activity = mapEditActivityModel(data);
      }
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
        const data = action.payload;
        state.activitiesRegistry[data.id] = data;
        state.loading = false;
        return state;
      });

      builder
      .addCase(attendActivity.pending, (state) => {
        state.submitting = true;
        return state;
      });
      builder
      .addCase(attendActivity.fulfilled, (state, action) => {
        const {activityId, currentUser} = action.payload;

        if(currentUser)
          state.activitiesRegistry[activityId].users.push(currentUser);

        state.submitting = false;
        return state;
      });

      builder
      .addCase(cancelActivityAttendance.pending, (state) => {
        state.submitting = true;
        return state;
      });
      builder
      .addCase(cancelActivityAttendance.fulfilled, (state, action) => {
        const {activityId, currentUserId} = action.payload;

        const attendees = state.activitiesRegistry[activityId].users;
        const index = attendees.findIndex(p => p.id === currentUserId);
        attendees.splice(index, 1);

        state.submitting = false;
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

export const {setActivityReducer, clearActivityReducer, setActivityCommentReducer, setValidationErrorsReducer, setFormActivityReducer} = activitiesSlice.actions;