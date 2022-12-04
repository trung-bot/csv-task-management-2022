import { ITask } from './../shared/task.model';
import { AssignTask, CompleteTask } from './../../state/task/task.action';
import { TaskService } from './../shared/task.service';
import { User } from './../../backend.service';
import { ITaskState } from './../../state/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTask } from '../../state/task/task.selector';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$ = this.store.select(selectTask);
  displayedColumns: string[] = ['Key', 'Name', 'Assignee', 'Staus', 'CreatedDate', 'Action'];
  availableStatus: string[] = ["ToPlan", "InProgress", "Completed"];
  allAssignees: User[];
  constructor(
    private store: Store<ITaskState>,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {

  }

  onGetAssignees() {
    this.taskService.getUser().subscribe(res => {
      this.allAssignees = res;
    })
  }

  onAssign(taskId:number, userId: number) {
    this.store.dispatch(AssignTask({taskId: taskId, userId: userId}))
  }

  onComplete(taskId) {
    this.store.dispatch(CompleteTask({Id: taskId}))
  }

}
