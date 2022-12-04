import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskWorkspaceComponent } from './task-workspace.component';
import { TaskRoutingModule } from './task-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { AddEditTaskDialogComponent } from './dialog/add-edit-task-dialog/add-edit-task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    TaskWorkspaceComponent,
    TaskListComponent,
    AddEditTaskDialogComponent,
    TaskDetailComponent,
    FilterBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TaskRoutingModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    
  ],
  entryComponents: [
    AddEditTaskDialogComponent
  ]
})
export class TaskModule {
 }
