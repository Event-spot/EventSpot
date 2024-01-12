// import {ObjectType, Field, Int} from "@nestjs/graphql";
import {Column, PrimaryGeneratedColumn, Entity} from "typeorm";

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
}