import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksReposity } from './tasks.repository';
import { TaskStatus } from './tasks.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksReposity)
    private tasksRepository: TasksReposity,
  ) {}

  async getTasks(inputFilters: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = inputFilters;
    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException('Could not find task.');
    }
    return found;
  }

  async createTask(createTaskInput: CreateTaskDto, user: User): Promise<Task> {
    const fields = {
      ...createTaskInput,
      status: TaskStatus.OPEN,
    };

    const task = this.tasksRepository.create({ ...fields, user });
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<string> {
    const deletedTasks = await this.tasksRepository.delete({ id: id });

    if (!deletedTasks.affected) {
      throw new NotFoundException('Unable to delete given task');
    }
    return id;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  // getAllTasks(): readonly Task[] {
  //     return this.tasks;
  // }

  // getTasksWithFilters(inputFilters: GetTasksFilterDto): readonly Task[] {
  //     const { status, search } = inputFilters;

  //     let tasks = this.getAllTasks();
  //     if(status){
  //         tasks = tasks.filter((t) => t.status === status);
  //     }

  //     if(search){
  //        tasks = tasks.filter((t) => t.title.includes(search) || t.description.includes(search));
  //     }
  //     return tasks;
  // }

  // getTaskById(id: string): Task {

  //     const taskFound = this.tasks.find((t) => t.id === id);
  //     if(!taskFound) {
  //         throw new NotFoundException("Could not find the task with that ID");
  //     }
  //     return taskFound;
  // }

  // createTask(createTaskInput: CreateTaskDto): Task {
  //    const createdTask: Task = {
  //        ...createTaskInput,
  //         id: uuid(),
  //         status: TaskStatus.OPEN,
  //     }

  //     this.tasks.push(createdTask);
  //     return createdTask;
  // }

  // deleteTask(id: string): string {
  //     this.tasks = this.tasks.filter((t) => t.id !== id);
  //     return id;
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //     this.tasks = this.tasks.map((t) =>{ return t.id === id ? {...t, status: status}: t });
  //     return this.getTaskById(id);
  // }
}
