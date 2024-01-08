// import {ObjectType, Field, Int} from "@nestjs/graphql";
import {Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable} from "typeorm";
import EventEntity from "../../event/entities/event.entity";

@Entity({name: "user"})
export class UserEntity {

    @PrimaryGeneratedColumn()
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

    @ManyToMany(() => EventEntity, (event) => event.attendees, {nullable: true})
    events?: EventEntity[];
}