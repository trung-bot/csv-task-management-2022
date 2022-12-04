import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { ITask } from "./task/shared/task.model";

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */

export type User = {
  Id: number;
  Name: string;
};

export interface IFilterCondition {
  SearchText?: string;
  IsCompleted?: boolean;
  AssigneeIds?: number[];
}

export type Task = {
  Id: number;
  Key: string;
  Name: string;
  Description: string;
  Completed: boolean
  Assignee: User;
  CreatedDate: Date
};

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable()
export class BackendService {
  constructor() {
    this.storedTasks.forEach(f => {
      f.Description = `Le seul outil de gestion des tâches dont vous avez besoin pour gérer vos tâches et créer des listes
      Vous cherchez un logiciel de gestion des tâches pour mieux organiser les tâches individuelles ou d’équipe dans un seul et même espace partagé ? Avec Asana, vous pouvez facilement collaborer avec votre équipe, où que vous soyez.`
    })
  }
  toDay = new Date();
  
  storedTasks: Task[] = [
    {Id: 1, Name: 'Hydrogen',Description: '' , Assignee:{Id: 111, Name: 'Fernando Torres'}, Completed: false, Key: "CSV-1", CreatedDate: new Date(this.toDay.setDate(this.toDay.getDate() - Math.random() * 1000))},
    {Id: 2, Name: 'Helium',Description: '' , Assignee:{Id: 222, Name: 'Filipo Inzaghi'}, Completed: true , Key: "CSV-2", CreatedDate: new Date(this.toDay.setDate(this.toDay.getDate() - Math.random() * 1000))},
    {Id: 3, Name: 'Lithium',Description: '' , Assignee:{Id: 111, Name: 'Fernando Torres'}, Completed: true , Key: "CSV-3", CreatedDate: new Date(this.toDay.setDate(this.toDay.getDate() - Math.random() * 1000))},
    {Id: 4, Name: 'Beryllium',Description: '' , Assignee:{Id: 222, Name: 'Filipo Inzaghi'}, Completed: false , Key: "CSV-4", CreatedDate: new Date(this.toDay.setDate(this.toDay.getDate() - Math.random() * 1000))},
    {Id: 5, Name: 'Boron',Description: '' , Assignee:{Id: 444, Name: 'Lautaro Matinez'}, Completed: false , Key: "CSV-5", CreatedDate: new Date(this.toDay.setDate(this.toDay.getDate() - Math.random() * 1000))},
    {Id: 6, Name: 'Carbon',Description: '' , Assignee:{Id: 555, Name: 'Romelu Lukakic'}, Completed: true , Key: "CSV-6", CreatedDate: new Date(this.toDay.setDate(this.toDay.getDate() - Math.random() * 1000))},
  ];

  storedUsers: User[] = [
    { Id: 111, Name: "Fernando Torres" },
    { Id: 222, Name: "Filipo Inzaghi" },
    { Id: 333, Name: "Pavel Nedved" },
    { Id: 444, Name: "Lautaro Matinez" },
    { Id: 555, Name: "Romelu Lukakic" },
  ];

  lastId = 10;

  private findTaskById = Id =>
    this.storedTasks.find(task => task.Id === +Id);

  private findUserById = Id => this.storedUsers.find(user => user.Id === +Id);

  tasks(filter?: IFilterCondition) {
    let result = [];

    if(filter) {
      result = this.storedTasks.filter(t => 
        (filter.SearchText ? (t.Name.toLowerCase().includes(filter.SearchText.toLowerCase()) || t.Key.toLowerCase().includes(filter.SearchText.toLowerCase())) : true)
      && ((filter.IsCompleted !== undefined && filter.IsCompleted !== null) ? (t.Completed === filter.IsCompleted) : true)
      && ((filter.AssigneeIds && filter.AssigneeIds.length > 0) ? filter.AssigneeIds.includes(t.Assignee.Id) : true)
      )
    } else {
      result = this.storedTasks;
    }

    return of(result).pipe(delay(randomDelay()));
  }

  task(Id: number): Observable<Task> {
    return of(this.findTaskById(Id)).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(Id: number) {
    return of(this.findUserById(Id)).pipe(delay(randomDelay()));
  }

  newTask(payload: ITask) {
    const newTask: ITask = {
      Id: ++this.lastId,
      Key: 'CSV-' + this.lastId,
      CreatedDate: this.toDay,
      Completed: false,
      ...payload,
      
    };

    this.storedTasks = this.storedTasks.concat(newTask);
    return of(newTask).pipe(delay(randomDelay()));
  }

  assign(taskId: number, userId: number) {
    return this.update(taskId, { Assignee: this.findUserById(userId) });
  }

  complete(taskId: number) {
    return this.update(taskId, { Completed: true });
  }

  update(taskId: number, updates: Partial<Omit<Task, "Id">>) {
    const foundTask = this.findTaskById(taskId);

    if (!foundTask) {
      return throwError(new Error("task not found"));
    }

    const updatedTask = { ...foundTask, ...updates };

    this.storedTasks = this.storedTasks.map(t =>
      t.Id === taskId ? updatedTask : t
    ); 

    return of(updatedTask).pipe(delay(randomDelay()));
  }
}
