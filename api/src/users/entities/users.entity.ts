import {Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, OneToMany} from "typeorm";
import {Events} from "../../events/entities/events.entity";
import {Field, Int, ObjectType} from "@nestjs/graphql";
import Comments from "../../comments/entities/comments.entity";

@Entity('users')
@ObjectType('users')
export class Users {

    @PrimaryGeneratedColumn({primaryKeyConstraintName: 'PK_users'})
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @Column({name: "first_name"})
    @Field()
    firstname: string;

    @Column({name: "last_name"})
    @Field()
    lastname: string;

    @Column({nullable: true})
    @Field({nullable: true})
    localization?: string;

    @Column({name: "spots_visited"})
    @Field(type => Int)
    spotsVisited: number;

    @Column()
    @Field(type => Int)
    followers: number;

    @Column()
    @Field(type => Int)
    following: number;

    @ManyToMany(() => Events, (event) => event.attendees, {nullable: true})
    @Field(type => [Events], {nullable: true})
    events?: Events[];

    @OneToMany(type => Comments, comment => comment.user, {nullable: true})
    @Field(type => [Comments], {nullable: true})
    comments?: Comments[]
}