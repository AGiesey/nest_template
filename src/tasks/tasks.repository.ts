import { DataSource, EntityManager, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TasksRepository extends Repository<Task>{

    constructor(
        private dataSource: DataSource,
        private entityManager: EntityManager
        ) {
        super(Task, entityManager);
    }
}