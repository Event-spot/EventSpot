import { Injectable, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Contact} from "./entities/contact.entity";
import {Repository} from "typeorm";
import AddContactArgs from './dto/addContact.args';


@Injectable()
export class ContactService {
    constructor(@InjectRepository(Contact)public readonly contactRepo: Repository<Contact>) {}

    async findAllContact(): Promise<Contact[]>{
        let contact: Contact[] = await this.contactRepo.find({});
        return contact;
    }

    async addContact(addContactArgs: AddContactArgs): Promise<string> {
        let contact: Contact = new Contact();
        contact.title = addContactArgs.title;
        contact.email = addContactArgs.email;
        contact.number = addContactArgs.number;
        contact.message = addContactArgs.message;

        await this.contactRepo.save(contact);
        return "Contact has been added";
    }
}
