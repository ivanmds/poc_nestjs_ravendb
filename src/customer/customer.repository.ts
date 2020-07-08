import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/shared/base.repository";

@Injectable()
export class CustomerRepository extends BaseRepository<Customer> {

    constructor() {
        super(customerCollectionName);
    }

    async getByCompany(companyKey: string): Promise<Customer[]> {

        const session = this.store.openSession();

        const customers = await session.query({ collection: customerCollectionName })
            .whereEquals("companyKey", companyKey).all();

        return customers as Customer[];
    }

    async getByCompanyAndDocument(companyKey: string, documentNumber: string): Promise<Customer> {

        const session = this.store.openSession();

        const customer = await session.query({ collection: customerCollectionName })
            .whereEquals("companyKey", companyKey)
            .whereEquals("documentNumber", documentNumber)
            .firstOrNull();

        return customer as Customer;
    }

    async save(customer: Customer): Promise<Customer> {

        const session = this.store.openSession();
        await session.store(customer);
        await session.saveChanges();
        return customer;
    }
}

export const customerCollectionName = "Customers";