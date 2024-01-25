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

    @Column({nullable: true})
    @Field({nullable: true})
    description?: string;

    @Column({nullable: true})
    @Field({nullable: true})
    facebook?: string;

    @Column({nullable: true})
    @Field({nullable: true})
    instagram?: string;

    @Column({nullable: true})
    @Field({nullable: true})
    tiktok?: string;

    @Column({nullable: true})
    @Field({nullable: true})
    youtube?: string;

    @ManyToMany(() => Users, users => users.following, {nullable: true, onDelete: "CASCADE"})
    @JoinTable({
        name: 'user_following',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'followingId',
            referencedColumnName: 'id'
        }
    })
    @Field(type => [Users], {nullable: true})
    following?: Users[];

    @ManyToMany(() => Events, (event) => event.attendees, {nullable: true,onDelete:"CASCADE",onUpdate:"CASCADE", cascade: ['insert']})
    @Field(type => [Events], {nullable: true})
    events?: Events[];

    @OneToMany(type => Comments, comment => comment.user, {nullable: true})
    @Field(type => [Comments], {nullable: true})
    comments?: Comments[]
}