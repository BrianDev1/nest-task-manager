import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    // Temp before Database setup
    // Change to async for DB requests
    private tasks: Task[] = [];

    getAllTasks(): readonly Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((t) => t.id === id);
    }

    createTask(createTaskInput: CreateTaskDto): Task {
       const createdTask: Task = {
           ...createTaskInput,
            id: uuid(),
            status: TaskStatus.OPEN,
        }

        this.tasks.push(createdTask);
        return createdTask;
    }

    deleteTask(id: string): string {
        this.tasks = this.tasks.filter((t) => t.id !== id);
        return id;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        this.tasks = this.tasks.map((t) =>{ return t.id === id ? {...t, status: status}: t });
        return this.getTaskById(id);
    }
}
