import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/backend.service';
import { ITaskState } from 'src/app/state/app.state';
import { TaskService } from '../shared/task.service';

const ALL_STATUS = "All Status";
const COMPLETED = "Completed";
const NOT_COMPLETED = "Not Completed";
const ASSIGNEE = "Assignee";
@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  seachText: string;
  selectedAssignee: User[]; // list filter by assignee
  @Output() filterChanges = new EventEmitter();
  filterStausTitle = ALL_STATUS;
  filterAssigneeTitle = ASSIGNEE;
  allAssignee = [];
  constructor(
    private store: Store<ITaskState>,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  onClearSearch() {
    this.seachText = "";
  }
  onClearFilterStatus() {
    this.filterStausTitle = ALL_STATUS;
  }

  onSearch() {
    this.filterChanges.emit({SearchText:this.seachText});
  }

  onFilterStatus(value: string) {
    let result = null;
    if(value === 'All') {
      this.filterStausTitle = ALL_STATUS;
    } else if(value === 'Completed') {
      this.filterStausTitle = COMPLETED;
      result = true;
    } else {
      this.filterStausTitle = NOT_COMPLETED;
      result = false;
    }

    this.filterChanges.emit({IsCompleted:result});
  }

  onFilterAssignee() {
    this.filterAssigneeTitle = ASSIGNEE + ": " + this.selectedAssignee.map(x => x.Name).join(', ')
    this.filterChanges.emit({AssigneeIds: this.selectedAssignee.map(x => x.Id)});
  }

  getAllAssignee() {
    this.taskService.getUser().subscribe(res => {
      this.allAssignee = res;
    })
  }

  selecAssignee($event:any) {
     // this stops the menu from closing
     $event.stopPropagation();
     $event.preventDefault();
  }
}
