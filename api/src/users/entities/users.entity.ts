// import {ObjectType, Field, Int} from "@nestjs/graphql";
import {Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable} from "typeorm";
import EventsEntity from "../../events/entities/events.entity";

@Entity({name: "users"})
export class UsersEntity {

    @PrimaryGeneratedColumn({primaryKeyConstraintName: 'PK_users'})
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({name: "first_name"})
    firstname: string;

    @Column({name: "last_name"})
    lastname: string;

    @Column({nullable: true})
    localization?: string;

    @Column({name: "spots_visited"})
    spotsVisited: number;

    @Column()
    followers: number;

    @Column()
    following: number;

    @ManyToMany(() => EventsEntity, (event) => event.attendees, {nullable: true})
    events?: EventsEntity[];
}