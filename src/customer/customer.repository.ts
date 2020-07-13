import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/shared/base.repository";
import { Customer } from "./customer.entities";
import { CustomerWithDeviceResult, nameCustomerWithDeviceIndex } from "src/config/Indexs/customer_with_device.index";

@Injectable()
export class CustomerRepository extends BaseRepository<Customer> {

    constructor() {
        super(customerCollectionName);
    }

    async findByCompany(companyKey: string): Promise<Customer[]> {

        const session = this.store.openSession();

        const customers = await session.query({ collection: customerCollectionName })
            .whereEquals("companyKey", companyKey).all();

        return customers as Customer[];
    }

    async findWidhDevice(companyKey: string, documentNumber: string): Promise<CustomerWithDeviceResult> {
        const session = this.store.openSession();
        const id = Customer.getId(companyKey, documentNumber);
        const result = await session.query({ indexName: "CustomerWithDeviceIndex" })
            .whereEquals("companyKey", companyKey)
            .whereEquals("documentNumber", documentNumber)
            .firstOrNull();

        return result as CustomerWithDeviceResult;
    }

    async findByCompanyAndDocument(companyKey: string, documentNumber: string): Promise<Customer> {
        const session = this.store.openSession();
        const id = Customer.getId(companyKey, documentNumber);
        return await session.load(id) as Customer;
    }

    async save(customer: Customer): Promise<Customer> {
        const session = this.store.openSession();
        const id = Customer.getId(customer.companyKey, customer.documentNumber);
        await session.store(customer, id);
        await session.saveChanges();
        return customer;
    }
}

export const customerCollectionName = "Customers";