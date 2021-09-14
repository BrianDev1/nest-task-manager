import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

// Can change this to be a resolver for GraphQL
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): readonly Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body("title") title: string, @Body("description") description: string ): Task {
        return this.tasksService.createTask(title,description);
    }
}
