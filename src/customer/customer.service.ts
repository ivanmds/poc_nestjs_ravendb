import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "./customer.repository";

@Injectable()
export class CustomerService {

    constructor(private readonly customerRepository: CustomerRepository) { }

    async find(companyKey: string, documentNumber: string): Promise<Customer> {
        return await this.customerRepository.Get(companyKey, documentNumber);
    }

    async save(customer: Customer): Promise<void> {
        await this.customerRepository.Save(customer);
    }

}