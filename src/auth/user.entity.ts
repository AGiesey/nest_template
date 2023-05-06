import { BaseEntity } from "src/common/base-entity";
import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    surName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[];

}