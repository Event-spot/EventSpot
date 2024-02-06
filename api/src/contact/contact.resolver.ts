import {Resolver} from '@nestjs/graphql';
import {Contact} from "./entities/contact.entity";
import {ContactService} from "./contact.service";
import { Query, Mutation, Args} from '@nestjs/graphql';
import AddContactArgs from './dto/addContact.args';
@Resolver(of => Contact)
export class ContactResolver {
    constructor(private readonly contactService: ContactService) {
    }

    @Query(returns => [Contact], {name: 'contact'})
    getAllContact() {
        return this.contactService.findAllContact();
    }

    @Mutation(returns => String, {name: 'addContact'})
    addContact(@Args('addContactArgs') addContactArgs: AddContactArgs) {
        return this.contactService.addContact(addContactArgs);
    }
}
