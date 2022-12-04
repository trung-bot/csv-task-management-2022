import { getTaskDetail } from './../../state/task/task.selector';
import { ITaskState } from 'src/app/state/app.state';
import { ITask } from './../shared/task.model';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { BackendService } from 'src/app/backend.service';
import { TaskEffects } from 'src/app/state/task/task.effects';
import { TasksReducer } from 'src/app/state/task/task.reducer';
import { RouterTestingModule } from "@angular/router/testing";
import { TaskDetailComponent } from './task-detail.component';
import { interval, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let mockStore: MockStore<ITaskState>;
  let mockTaskSelector: MemoizedSelector<ITaskState, ITask>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDetailComponent ],
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

        RouterTestingModule
      ],
      providers: [
        BackendService,
        provideMockStore(),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.get(Store);
    mockTaskSelector = mockStore.overrideSelector(getTaskDetail, {Id: 2, Name: 'Helium',Description: '' , Assignee:{Id: 222, Name: 'Filipo Inzaghi'}, Completed: true , Key: "CSV-2", CreatedDate: new Date()});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title of the task', async () => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const complied = fixture.debugElement.nativeElement;
    expect(complied.querySelector('.task-name').textContent).toContain('Helium');
  })
});
