import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable, Timestamp} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";

@Entity({name: 'event'})
export default class EventEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
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

    @ManyToMany(() => UserEntity, (user) => user.events, {nullable: true, onDelete: "CASCADE"})
    @JoinTable()
    attendees?: UserEntity[];
}