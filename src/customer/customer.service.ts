import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "./customer.repository";

@Injectable()
export class CustomerService {

    constructor(private readonly customerRepository: CustomerRepository) { }

    async findByCompany(companyKey: string): Promise<Customer[]> {
        return await this.customerRepository.getByCompany(companyKey);
    }

    async findByCompanyAndDocument(companyKey: string, documentNumber: string): Promise<Customer> {
        return await this.customerRepository.getByCompanyAndDocument(companyKey, documentNumber);
    }

    async save(customer: Customer): Promise<void> {
        await this.customerRepository.save(customer);
    }
}