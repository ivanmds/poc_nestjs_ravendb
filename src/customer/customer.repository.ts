import { Injectable } from "@nestjs/common";
import { DocumentStore } from 'ravendb';

@Injectable()
export class CustomerRepository {

    private readonly store: DocumentStore;

    constructor() {
        this.store = new DocumentStore("http://localhost:8080", "customerDb");
        this.store.conventions.findCollectionNameForObjectLiteral = CreateCustomerDto => "customers";
        this.store.initialize();   
    }

    async getByCompany(companyKey: string): Promise<Customer[]> {

        const session = this.store.openSession();

        const customers = await session.query({ collection: "Customers" })
            .whereEquals("companyKey", companyKey).all();

        return customers as Customer[];
    }

    async getByCompanyAndDocument(companyKey: string, documentNumber: string): Promise<Customer> {

        const session = this.store.openSession();

        const customer = await session.query({ collection: "Customers" })
            .whereEquals("companyKey", companyKey)
            .whereEquals("documentNumber", documentNumber)
            .firstOrNull();

        return customer as Customer;
    }

    async save(customer: Customer): Promise<void> {

        const session = this.store.openSession();
        await session.store(customer);
        await session.saveChanges();
    }
}