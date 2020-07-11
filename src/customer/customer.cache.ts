import { BaseCache } from "src/shared/base.cache";
import { Injectable } from "@nestjs/common";
import { Customer } from "./customer.entities";

@Injectable()
export class CustomerCache extends BaseCache<Customer> {

    constructor() { super("customers"); }

    async find(companyKey: string, documentNumber: string): Promise<Customer> {
        const key = Customer.getId(companyKey, documentNumber);
        return await this.get(key);
    }

    async delete(companyKey: string, documentNumber: string): Promise<any> {
        const key = Customer.getId(companyKey, documentNumber);
        await this.deleteKey(key);
    }

    async save(customer: Customer): Promise<Boolean> {
        const key = Customer.getId(customer.companyKey, customer.documentNumber);
        return await this.set(key, customer);
    }
}