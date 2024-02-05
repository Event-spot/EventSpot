import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    ManyToOne
} from "typeorm";
import { Users } from '../../users/entities/users.entity';
import {ObjectType, Field, Int} from "@nestjs/graphql";
import Comments from "../../comments/entities/comments.entity";

@Entity('events')
@ObjectType('events')
export class Events {

    @PrimaryGeneratedColumn({primaryKeyConstraintName: 'PK_events'})
    @Field(type => Int)
    id: number;

    @Column({nullable: false})
    @Field()
    name: string;

    @Column({type: 'timestamptz'})
    @Field(type => Date)
    date: Date;

    @CreateDateColumn({name: 'create_date', type: 'timestamptz'})
    @Field(type => String)
    createDate: Date;

    @Column()
    @Field()
    localization: string;


    @Column({nullable:true})
    @Field({nullable: true})
    general_information: string;
    
    @Column({nullable: true})
    @Field({nullable: true})
    competitions: string;

    @Column({nullable: true})
    @Field({nullable: true})
    localization_details: string;

    @Column({nullable: true})
    @Field({nullable: true})
    bannerImage: string;


    // TODO: Organizer relation

    @OneToMany(type => Comments, comment => comment.event, {nullable: true})
    @Field(type => [Comments], {nullable: true})
    comments?: Comments[];

    @ManyToMany(() => Users, (user) => user.events, {nullable: true, onDelete: "CASCADE", cascade: ['insert']})
    @JoinTable()
    @Field(type => [Users], {nullable: true} )
    attendees?: Users[];
    
    @ManyToOne(() => Users, user => user.organizedEvents, {nullable: true, onDelete: "CASCADE"})
    @Field(type => Users)
    organizer?: Users;
    //TODO: Organizer nullable: false
}