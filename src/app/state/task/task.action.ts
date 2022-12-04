import { IFilterCondition } from './../../backend.service';
import { createAction, props } from '@ngrx/store';
import { ITask } from '../../task/shared/task.model';

export const GET_ALL_TASKS = '[ALL] Tasks';
export const GET_ALL_TASKS_SUCCESS = '[ALL] ALL_Tasks Success';
export const GET_ALL_TASKS_ERROR = '[ALL] ALL_Tasks Error';

export const GET_TASK_DETAIL = '[GET] Tasks';
export const GET_TASK_DETAIL_SUCCESS = '[GET] TASK_DETAIL Success';
export const GET_TASK_DETAIL_ERROR = '[GET] TASK_DETAIL Error';

export const CREATE_TASK = '[CREATE] Task';
export const CREATE_TASK_SUCCESS = '[CREATE] Task Success';
export const CREATE_TASK_ERROR = '[CREATE] Task Error';

export const COMPETED_TASK = '[COMPETED] Task';
export const COMPETED_TASK_SUCCESS = '[COMPETED] Task Success';
export const COMPETED_TASK_ERROR = '[COMPETED] Task Error';

export const ASSIGN_TASK = '[ASSIGN] Task';
export const ASSIGN_TASK_SUCCESS = '[ASSIGN] Task Success';
export const ASSIGN_TASK_ERROR = '[ASSIGN] Task Error';


export const GetAllTasks = createAction(
  GET_ALL_TASKS,
  props<{ QueryCondition: IFilterCondition }>()
);

export const GetAllTasksSuccess = createAction(
  GET_ALL_TASKS_SUCCESS,
  props<{ Tasks: ITask[] }>()
);

export const GetAllTasksError = createAction(
  GET_ALL_TASKS_ERROR,
  props<{  Error: any  }>()
);

export const AddNewTask = createAction(
  '[Task Page] Add New Task',
  props<{ PayLoad: ITask }>()
);

export const AddNewTaskSuccess = createAction(
  '[Task Page] Add New Task Success',
  props<{ NewTask: ITask }>()
);

export const AddNewTaskFailed = createAction(
  '[Task Page] Add New Task Failed',
  props<{  Error: any  }>()
);

export const GetTaskDetail = createAction(
  GET_TASK_DETAIL,
  props<{ Id: number }>()
);

export const GetTaskDetailSuccess = createAction(
  GET_TASK_DETAIL_SUCCESS,
  props<{ SelectedTask: ITask }>()
);

export const GetTaskDetailFailed = createAction(
  GET_TASK_DETAIL_ERROR,
  props<{  Error: any  }>()
)

export const CompleteTask = createAction(
  COMPETED_TASK,
  props<{ Id: number }>()
);

export const CompleteTaskSuccess = createAction(
  COMPETED_TASK_SUCCESS,
  props<{ SelectedTask: ITask }>()
);

export const CompleteTaskFailed = createAction(
  COMPETED_TASK_ERROR,
  props<{  Error: any  }>()
)


export const AssignTask = createAction(
  ASSIGN_TASK,
  props<{ taskId: number, userId: number }>()
);

export const AssignTaskSuccess = createAction(
  ASSIGN_TASK_SUCCESS,
  props<{ SelectedTask: ITask }>()
);

export const AssignTaskFailed = createAction(
  ASSIGN_TASK_ERROR,
  props<{  Error: any  }>()
)