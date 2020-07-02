import { Injectable } from "@nestjs/common";
import { DocumentStore } from 'ravendb';
import { CreateCustomerDto } from "./dto/create-customer.dto";

@Injectable()
export class CustomerRepository {

    async Get(companyKey: string, documentNumber: string): Promise<Customer> {

        const documentStore = new DocumentStore("http://localhost:8080", "Customers");
        documentStore.initialize();
        
        const session = documentStore.openSession();

        const customer = await session.query({ collection: "Customers" })
                                .whereEquals("companyKey", companyKey)
                                .whereEquals("documentNumber", documentNumber)
                                .firstOrNull();
                                
        return customer as Customer;
    }

    async Save(customer: CreateCustomerDto): Promise<void> {
        
        const documentStore = new DocumentStore("http://localhost:8080", "customerDb");
        documentStore.conventions.findCollectionNameForObjectLiteral = CreateCustomerDto => "customers";

        documentStore.initialize();

        const session = documentStore.openSession();

        await session.store(customer);
        await session.saveChanges();
    }
}