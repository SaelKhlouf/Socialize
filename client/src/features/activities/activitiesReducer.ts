import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ActivitiesApis } from '../../app/api/agent'
import { Activity } from '../../app/models/activity'

export type ActivitiesState = {
    activitiesRegistry: Map<string, Activity>
    selectedActivity: Activity | undefined;
    loading: boolean;
    activityEditMode: boolean;
    submitting: boolean;
    target: string | null;
    activity: Activity;
}

const initialState : ActivitiesState = {
    activitiesRegistry: new Map(),
    loading: false,
    selectedActivity: undefined,
    activityEditMode: false,
    submitting: false,
    target: null,
    activity: {
      id: '',
      title: '',
      description: '',
      category: '',
      date: '',
      city: '',
      venue: '',
  }
}

export const getActivities = createAsyncThunk(
  'activities/getActivities',
  async () => {
    return await ActivitiesApis.list();
});

export const getActivity = createAsyncThunk(
  'activities/getActivity',
  async (id: string) => {
    return await ActivitiesApis.details(id);
});

export const deleteActivity = createAsyncThunk(
    'activities/deleteActivity',
    async (data: {id: string, target: string}) => {
      await ActivitiesApis.delete(data.id);
      return data;
});

export const createActivity = createAsyncThunk(
    'activities/createActivity',
    async (activity : Activity) => {
      return await ActivitiesApis.create(activity);
});

export const updateActivity = createAsyncThunk(
    'activities/updateActivity',
    async (activity : Activity) => {
      return await ActivitiesApis.update(activity.id, activity);
});

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  // add your non-async reducers here
  reducers: {
    setLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      return state;
    },
    selectActivityAction: (state, action: PayloadAction<Activity | undefined>) => {
        state.selectedActivity = action.payload;
        return state;
    },
    setActivityEditModeAction: (state, action: PayloadAction<boolean>) => {
        state.activityEditMode = action.payload;

        if(state.selectedActivity)
          state.activity = state.selectedActivity;

        return state;
    },
    setActivityAction: (state, action: PayloadAction<Activity>) => {
        state.activity = action.payload;
        return state;
    },
    clearSelectedActivityAction: (state) => {
      state.selectedActivity = undefined;
      state.activity = {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: '',
      };
      state.activityEditMode = true;
      return state;
    },
  },
  // add your async reducers in extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(getActivities.pending, (state, action) => {
        state.loading = true;
        return state;
      })
      .addCase(getActivities.fulfilled, (state, action) => {
        const activitiesMapReducer = (map: Map<string, Activity>, activity: Activity) => map.set(activity.id, activity);
        state.activitiesRegistry = action.payload.data.reduce(activitiesMapReducer, new Map());
        state.loading = false;
        return state;
      });


    builder
      .addCase(getActivity.pending, (state, action) => {
        state.loading = true;
        return state;
      });
      builder
      .addCase(getActivity.fulfilled, (state, action) => {
        state.selectedActivity = action.payload;
        state.activity = state.selectedActivity;
        state.loading = false;
        return state;
      });
      

    builder
      .addCase(deleteActivity.pending, (state, action) => {
        const {target} = action.meta.arg;
        state.target = target;

        return state;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        const {id, target} = action.payload;
        state.target = target;
        state.activitiesRegistry.delete(id);
        if (id === state.selectedActivity?.id) {
            state.selectedActivity = undefined;
            state.activityEditMode = false;
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
          state.activitiesRegistry.set(createdActivity.id, createdActivity);
          state.selectedActivity = createdActivity;
          state.activity = createdActivity;

          state.submitting = false;
          state.activityEditMode = false;

          return state;
      });


      
    builder
      .addCase(updateActivity.pending, (state) => {
        state.submitting = true;
        return state;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
          const updatedActivity = action.payload;
          state.activitiesRegistry.set(updatedActivity.id, updatedActivity);
          if(state.selectedActivity?.id === updatedActivity.id){
            state.selectedActivity = updatedActivity;
          }
          
          state.submitting = false;
          state.activityEditMode = false;

          return state;
      });

  }
})

export const activitiesReducer = activitiesSlice.reducer;

export const {selectActivityAction, setActivityEditModeAction, setActivityAction, clearSelectedActivityAction} = activitiesSlice.actions;