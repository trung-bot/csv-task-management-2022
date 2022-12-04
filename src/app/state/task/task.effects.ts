import { ITaskState } from './../app.state';
import { BackendService } from './../../backend.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Store } from '@ngrx/store';
import * as taskAction from './task.action';
import { of } from 'rxjs';

@Injectable()
export class TaskEffects {

    constructor(
        private actions$: Actions,
        private backendService: BackendService,
    ) { }

    getTasks$ = createEffect(() => this.actions$.pipe(
        ofType(taskAction.GetAllTasks),
        mergeMap((payload) => this.backendService.tasks(payload.QueryCondition)
            .pipe(
                map((Tasks) => taskAction.GetAllTasksSuccess({ Tasks: Tasks })),
                catchError((Error) => of(taskAction.GetAllTasksError({ Error })))
            ))
    ));

    addTask$ = createEffect(() => this.actions$.pipe(
        ofType(taskAction.AddNewTask),
        mergeMap((payload) => this.backendService.newTask(payload.PayLoad)
            .pipe(
                map((Task) => taskAction.AddNewTaskSuccess({ NewTask: Task })),
                catchError((Error) => of(taskAction.AddNewTaskFailed({ Error })))
            ))
    ));

    getTaskDetail$ = createEffect(() => this.actions$.pipe(
        ofType(taskAction.GetTaskDetail),
        mergeMap((payload) => this.backendService.task(payload.Id)
            .pipe(
                map((Task) => taskAction.GetTaskDetailSuccess({ SelectedTask: Task })),
                catchError((Error) => of(taskAction.GetTaskDetailFailed({ Error })))
            ))
    ));

    completeTask$ = createEffect(() => this.actions$.pipe(
        ofType(taskAction.CompleteTask),
        mergeMap((payload) => this.backendService.complete(payload.Id)
            .pipe(
                map((Task) => taskAction.CompleteTaskSuccess({ SelectedTask: Task })),
                catchError((Error) => of(taskAction.CompleteTaskFailed({ Error })))
            ))
    ));

    assginTask$ = createEffect(() => this.actions$.pipe(
        ofType(taskAction.AssignTask),
        mergeMap((payload) => this.backendService.assign(payload.taskId, payload.userId)
            .pipe(
                map((Task) => taskAction.AssignTaskSuccess({ SelectedTask: Task })),
                catchError((Error) => of(taskAction.AssignTaskFailed({ Error })))
            ))
    ));
}