import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

// Can change this to be a resolver for GraphQL
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): readonly Task[] {
        return this.tasksService.getAllTasks();
    }

    // No Error hanlding for simplicity
    // Could possibly be undefined
    @Get("/:id")
    getTaskById(@Param("id") id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto ): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete("/:id")
    deleteTask(@Param("id") id: string): string {
        return this.tasksService.deleteTask(id);
    }

    @Patch("/:id/status")
    updateTaskStatus(@Param("id") id: string, @Body("status") status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
