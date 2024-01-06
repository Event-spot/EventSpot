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

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({nullable: true})
    localization?: string;

    @Column()
    spotsVisited: number;

    @Column()
    followers: number;

    @Column()
    following: number;
}