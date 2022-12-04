import { User } from './../../../backend.service';
import { TaskService } from './../../shared/task.service';
import { ITask } from './../../shared/task.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ITaskState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { AddNewTask } from '../../../state/task/task.action';

@Component({
  selector: 'app-add-edit-task-dialog',
  templateUrl: './add-edit-task-dialog.component.html',
  styleUrls: ['./add-edit-task-dialog.component.scss']
})
export class AddEditTaskDialogComponent implements OnInit, AfterViewInit {

  taskForm: FormGroup;
  title: string;
  currentTask: ITask; // Task to edit
  allAssignee: User[];
  constructor(
    private store: Store<ITaskState>,
    private formBuilder: FormBuilder,
    private taskServce: TaskService,
    private dialogRef: MatDialogRef<AddEditTaskDialogComponent>,
  ) { }

  ngOnInit(): void {
  
    this.taskForm = this.formBuilder.group(
      {
        Name: ['', Validators.required],
        Assignee: ['', Validators.required],
        Description: ['', Validators.required],
      }
    );
    this.buildTitle();
    this.getAllAssignees(); // Get All Assginee when init because we don't have control support get dynamic list from api.
  }

  ngAfterViewInit(): void {
  }

  private buildTitle() {
    if(this.currentTask) {
      this.title = this.currentTask.Name;
    } else {
      this.title = 'Add New Task'
    }
  }

  onSave() {
    if(!this.taskForm.valid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    let dataToSave = this.taskForm.getRawValue();
    this.store.dispatch(AddNewTask({PayLoad: dataToSave}));
    this.dialogRef.close()
  }

  onClose() {
    this.dialogRef.close()
  }

  rangTimeValidation(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const startControl = formGroup.get('StartTime');
      const endControl = formGroup.get('EndTime');
      if (startControl.value && endControl.value
       ) {
        return {rangeTimeError: true};
      } else {
        return null;
      }
    };
  }

  getAllAssignees() {
    this.taskServce.getUser().subscribe(res => {
      this.allAssignee = res;
    })
  }

}
