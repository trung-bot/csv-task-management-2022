import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { User } from './../../backend.service';
import { getTaskDetail } from './../../state/task/task.selector';
import { ITask } from './../shared/task.model';
import { ITaskState } from 'src/app/state/app.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { CompleteTask, GetTaskDetail } from '../../state/task/task.action';
import { AssignTask } from '../../state/task/task.action';
import { TaskService } from '../shared/task.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<any>();
  task$: Observable<ITask>;
  allAssignee: User[];
  constructor(
    private store: Store<ITaskState>,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {

   }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(GetTaskDetail({Id: +params.id}));
    });
    this.task$ = this.store.select(getTaskDetail).pipe(filter(f => !!f)) // geting detail has error and clear selected item in state. In that case we should not update null to current task.
  }

  onComplete(taskId: number) {
    this.store.dispatch(CompleteTask({Id: taskId}))
  }

  onGetAssignees() {
    this.taskService.getUser().subscribe(res => {
      this.allAssignee = res;
    })
  }

  onAssign(taskId: number, userId: number) {
    this.store.dispatch(AssignTask({taskId, userId}))
  }

}
