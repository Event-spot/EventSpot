import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import {ObjectType, Field, Int} from "@nestjs/graphql";
import {Users} from "../../users/entities/users.entity";
import {Events} from "../../events/entities/events.entity";
import {JoinColumn} from "typeorm/browser";

@Entity('comments')
@ObjectType('comments')
export default class Comments {

    @PrimaryGeneratedColumn({
        primaryKeyConstraintName: 'PK_comments',
    })
    @Field(type => Int)
    id: number;

    @Column()
    @Field(type => String)
    content: string;

    @CreateDateColumn({
        name: 'create_date',
    })
    @Field(type => String)
    createDate: Date;

    @ManyToOne(type => Users, user => user.comments)
    @Field(type => Users)
    user: Users;

    @ManyToOne(type => Events, event => event)
    @Field(type => Events)
    event: Events;
}