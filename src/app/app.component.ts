import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ITaskState } from './state/app.state';
import { getCreateError, getTasksError, getUpdateError } from './state/task/task.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = false;
  $destroyed = new Subject();
  constructor(private store: Store<ITaskState>,
    private cd: ChangeDetectorRef) {
      this.store.select(getCreateError).subscribe((error) => {
        this.actionError(error, 'Error while creating the task');
      });

      this.store.select(getTasksError).subscribe((error) => {
          this.actionError(error, 'Error while get tasks');
      });

      this.store.select(getUpdateError).subscribe((error) => {
          this.actionError(error, 'Error while updating the task');
      });
    }

    actionError(error: any, message: string) {
      if (error) {
        alert(message);
      }
    }
}
