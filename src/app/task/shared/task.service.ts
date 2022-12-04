import { BackendService } from './../../backend.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private backendService: BackendService) {}

  getUser() {
    return this.backendService.users();
  }
}
