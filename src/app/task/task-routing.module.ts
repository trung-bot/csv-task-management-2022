import { TaskDetailComponent } from './task-detail/task-detail.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskWorkspaceComponent } from "./task-workspace.component";

const routes: Routes = [
    { 
        path: '', 
        component: TaskWorkspaceComponent
    },
    {
        path: 'detail/:id',
        component: TaskDetailComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule {}