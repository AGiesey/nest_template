import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

    // TODO: set up a foreign key constraint.
    @Column({nullable: true})
    updatedBy: string;

    @DeleteDateColumn()
    deletedOn: Date;
}