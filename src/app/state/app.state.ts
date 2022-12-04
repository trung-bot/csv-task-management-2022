import { ITask } from "../task/shared/task.model";

export interface ITaskState {
    tasks: ITask[];
    newTask: ITask;
    selected: ITask;
    action: string;
    done: boolean;
    error: Error
}