import { BackendService } from './../../../backend.service';
import { TaskEffects } from './../../../state/task/task.effects';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TasksReducer } from 'src/app/state/task/task.reducer';

import { AddEditTaskDialogComponent } from './add-edit-task-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddEditTaskDialogComponent', () => {
  let component: AddEditTaskDialogComponent;
  let fixture: ComponentFixture<AddEditTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTaskDialogComponent ],
      imports:[
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,
        StoreModule.forRoot({ tasks: TasksReducer}),
        EffectsModule.forRoot([TaskEffects]),
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
      ],
      providers: [
        BackendService,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`form should be invalid`, async() => {
    component.taskForm.controls['Name'].setValue('');
    component.taskForm.controls['Description'].setValue('');
    component.taskForm.controls['Assignee'].setValue('');
    expect(component.taskForm.valid).toBeFalsy();
  })

  it(`form should be valid`, async() => {
    component.taskForm.controls['Name'].setValue('Trung');
    component.taskForm.controls['Description'].setValue('Tifosi');
    component.taskForm.controls['Assignee'].setValue({Id: 111, Name: 'Kaka'});
    expect(component.taskForm.valid).toBeTruthy();
  })
});
