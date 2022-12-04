import { IFilterCondition } from './../backend.service';
import { mergeMap } from 'rxjs/operators';
import { isUpdated, getCreateError, getTasksError, getTaskDetailError, getUpdateError } from './../state/task/task.selector';
import { ITaskState } from './../state/app.state';
import { Store } from '@ngrx/store';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GetAllTasks } from '../state/task/task.action';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditTaskDialogComponent } from './dialog/add-edit-task-dialog/add-edit-task-dialog.component';
import { merge, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isCreated } from '../state/task/task.selector';

@Component({
  selector: 'app-task-workspace',
  templateUrl: './task-workspace.component.html',
})
export class TaskWorkspaceComponent implements OnInit, AfterViewInit, OnDestroy {
  allSubcriptions = new Subscription();
  filterCondition: IFilterCondition = {
    SearchText: "",
    IsCompleted: null,
    AssigneeIds: []
  }
  $destroyed = new Subject();
  constructor(
    private store: Store<ITaskState>,
    private dialog: MatDialog
  ) { }
  ngOnDestroy(): void {
    this.$destroyed.next();
    this.$destroyed.complete();
  }

  ngOnInit(): void {
    this.store.select(isCreated).pipe(takeUntil(this.$destroyed)).subscribe((done) => {
      this.refreshListTasks();
    });
  }

  ngAfterViewInit(): void {
    
  }

  onAddNewTask() {
    let config: MatDialogConfig = {
      width: '800px',
      height: '90vh',
      disableClose: true,
      panelClass: 'add-edit-task-dialog'
    }
    this.dialog.open(AddEditTaskDialogComponent, config);
  }

  refreshListTasks(filter?: IFilterCondition) {
    if(filter) {
      
      this.filterCondition = Object.assign({}, {
        ...this.filterCondition,
        ... filter
      }); 
    }
    this.store.dispatch(GetAllTasks({ QueryCondition: this.filterCondition }));
  }

  /**
   * Trigger execute some action with task
   */
  actionSuccess(done: boolean, messeage: string) {
    
  }

  actionError(error: any, message: string) {
    if (error) {
      alert(message);
    }
  }
}
