import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";
import {ObjectType, Field, Int} from "@nestjs/graphql";


@Entity('contact')
@ObjectType('contact')
export class Contact {

    @PrimaryGeneratedColumn({primaryKeyConstraintName: 'PK_contact'})
    @Field(type => Int)
    id: number;

    @Column({nullable: false})
    @Field()
    title: string;

    @Column({nullable: false})
    @Field()
    email: string;

    @Column({nullable: false})
    @Field(()=> Int)
    number: number;

    @Column({nullable: false})
    @Field()
    message: string;
}