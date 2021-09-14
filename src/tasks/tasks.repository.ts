import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksReposity extends Repository<Task> {
    
}