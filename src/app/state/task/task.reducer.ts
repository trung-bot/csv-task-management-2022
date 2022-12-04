import { Action, createReducer, on} from '@ngrx/store';
import { ITaskState } from '../app.state';
import * as taskAction from './task.action';

export const initialState: ITaskState = {
    tasks:  [],
    newTask: null,
    action: null,
    selected: null,
    done: false,
    error: null,
};

const reducer = createReducer(
    initialState,
      /*************************
     * GET all tasks actions
     ************************/
    on(taskAction.GetAllTasks, state => ({...state, done: false, action: taskAction.GET_ALL_TASKS, error: null})),
    on(taskAction.GetAllTasksSuccess, (state, { Tasks }) => ({ ...state, selected: null, tasks: Tasks, done: true, error: null })),
    on(taskAction.GetAllTasksError, (state, { Error }) => ({...state, selected: null, done: true, error: Error})),

     /*************************
     * CREATE task actions
     ************************/
    on(taskAction.AddNewTask, state => ({...state, done: false, action: taskAction.CREATE_TASK})),
    on(taskAction.AddNewTaskSuccess, (state, { NewTask }) => ({ ...state, newTask: NewTask, done: true, error: null })),
    on(taskAction.AddNewTaskFailed, (state, { Error }) => ({ ...state, error: Error, done: true })),

     /*************************
     * GET task detail
     ************************/
    on(taskAction.GetTaskDetail, state => ({...state, done: false, action: taskAction.GET_TASK_DETAIL})),
    on(taskAction.GetTaskDetailSuccess, (state, { SelectedTask }) => ({ ...state, selected: SelectedTask, done: true, error: null })),
    on(taskAction.GetTaskDetailFailed, (state, { Error }) => ({ ...state, error: Error, done: true })),

     /*************************
     * COMPLETE task detail
     ************************/
    on(taskAction.CompleteTask, state => ({...state, done: false, action: taskAction.COMPETED_TASK, error: null})),
    on(taskAction.CompleteTaskSuccess, (state, { SelectedTask }) => {
        const index = state.tasks.findIndex(t => t.Id === SelectedTask.Id);
        
        const tasks = [...state.tasks.slice(0, index),
            SelectedTask,
            ...state.tasks.slice(index + 1)]
          return { ...state, tasks, selected: SelectedTask, done: true, error: null }
    }),
    on(taskAction.CompleteTaskFailed, (state, { Error }) => ({ ...state, error: Error, done: true })),

    /*************************
     * ASSIGN task
    ************************/
    on(taskAction.AssignTask, state => ({...state, done: false, action: taskAction.ASSIGN_TASK})),
    on(taskAction.AssignTaskSuccess, (state, { SelectedTask }) => {
        const index = state.tasks.findIndex(t => t.Id === SelectedTask.Id);
        
        const tasks = [...state.tasks.slice(0, index),
            SelectedTask,
            ...state.tasks.slice(index + 1)]
          return { ...state, tasks, selected: SelectedTask, done: true, error: null }
    } ),
    on(taskAction.AssignTaskFailed, (state, { Error }) => ({ ...state, error: Error, done: true })),

)

export function TasksReducer(state = initialState, action: Action) {
    return reducer(state, action);
}
