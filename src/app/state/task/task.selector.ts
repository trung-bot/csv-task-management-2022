import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ITaskState } from '../app.state';
import { CREATE_TASK, GET_TASK_DETAIL, COMPETED_TASK, ASSIGN_TASK, GET_ALL_TASKS } from './task.action';
 
export const featureKey = 'tasks';

export const getTaskState = createFeatureSelector<ITaskState>(featureKey);
 
export const selectTask = createSelector(getTaskState,(state: ITaskState) => state.tasks);

export const isCreated = createSelector(getTaskState, (state: ITaskState) => state.action === CREATE_TASK && state.done && !state.error );

export const isUpdated = createSelector(getTaskState, (state: ITaskState) => {
  if(state && (state.action === COMPETED_TASK || state.action === ASSIGN_TASK) && state.done && !state.error ) {
    return state.selected
  }});

export const getCreateError = createSelector(getTaskState, (state: ITaskState) => {
  return (state && state.action === CREATE_TASK && state.done)
    ? state.error 
   : null;
});

export const getUpdateError = createSelector(getTaskState, (state: ITaskState) => {
  return (state && (state.action === COMPETED_TASK || state.action === ASSIGN_TASK) && state.done)
    ? state.error
   : null;
});

export const getTasksError = createSelector(getTaskState, (state: ITaskState) => {
  return (state && state.action === GET_ALL_TASKS && state.done)
    ? state.error
   : null;
});

export const getTaskDetailError = createSelector(getTaskState, (state: ITaskState) => {
  return (state && state.action === GET_TASK_DETAIL && state.done)
    ? state.error
   : null;
});

export const getTaskDetail = createSelector(getTaskState, 
  (state: ITaskState) => {
    if (state && state.done && !state.error) {
      return state.selected;
}})