import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    // Temp before Database setup
    // Change to async for DB requests
    private tasks: Task[] = [];

    getAllTasks(): readonly Task[] {
        return this.tasks;
    }

    getTasksWithFilters(inputFilters: GetTasksFilterDto): readonly Task[] {
        const { status, search } = inputFilters;

        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter((t) => t.status === status);
        }

        if(search){
           tasks = tasks.filter((t) => t.title.includes(search) || t.description.includes(search));
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        
        const taskFound = this.tasks.find((t) => t.id === id);
        if(!taskFound) {
            throw new NotFoundException("Could not find the task with that ID");
        }
        return taskFound;
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
