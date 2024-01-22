import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable, Timestamp} from "typeorm";
import {UsersEntity} from "../../users/entities/users.entity";

@Entity({name: 'events'})
export default class EventsEntity {

    @PrimaryGeneratedColumn({primaryKeyConstraintName: 'PK_events'})
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({type: 'date'})
    date: Date;

    @CreateDateColumn({name: 'create_date', type: 'timestamptz'})
    createDate: Date;

    @Column()
    localization: string;

    @Column()
    description: string;

    // TODO: Organizer relation

    // TODO: Comments relation

    @ManyToMany(() => UsersEntity, (user) => user.events, {nullable: true, onDelete: "CASCADE", onUpdate: 'CASCADE'})
    @JoinTable()
    attendees?: UsersEntity[];
}