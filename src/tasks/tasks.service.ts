import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from "uuid";

@Injectable()
export class TasksService {
    // Temp before Database setup
    private tasks: Task[] = [];

    getAllTasks(): readonly Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string): Task {
       const createdTask: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(createdTask);
        return createdTask;
    }
}
