import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "./customer.repository";
import { Result } from "src/shared/result";
import { Customer } from "./customer.entities";
import { CustomerCache } from "./customer.cache";
import { CustomerWithDeviceResult } from "src/config/Indexs/customer_with_device.index";

@Injectable()
export class CustomerService {

    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly customerCache: CustomerCache) { }

    async findByCompany(companyKey: string): Promise<Customer[]> {
        return await this.customerRepository.findByCompany(companyKey);
    }

    async findByCompanyAndDocument(companyKey: string, documentNumber: string): Promise<Customer> {
        var customer: Customer = await this.customerCache.find(companyKey, documentNumber);

        if (!customer) {
            customer = await this.customerRepository.findByCompanyAndDocument(companyKey, documentNumber);
            if(customer)
                await this.customerCache.save(customer);
        }

        return customer;
    }

    async create(customer: Customer): Promise<Result<Customer>> {
        const result = new Result<Customer>();

        const alreadyExist = await this.customerAlreadyExist(customer.companyKey, customer.documentNumber);
        if (alreadyExist) {
            result.isSuccess = false;
            result.errors = ["Customer already exist"];
        } else {
            await this.customerRepository.save(customer);
            result.data = customer;
        }

        return result;
    }

    async update(customer: Customer): Promise<Result<Customer>> {
        const result = new Result<Customer>();

        const alreadyExist = await this.customerAlreadyExist(customer.companyKey, customer.documentNumber);
        if (!alreadyExist) {
            result.isSuccess = false;
            result.errors = ["Not was possible update, because customer not exist yet."];
        } else {
            customer = await this.customerRepository.save(customer);
            this.customerCache.delete(customer.companyKey, customer.documentNumber);
            result.data = customer;
        }

        return result;
    }

    async findWidhDevice(companyKey: string, documentNumber: string): Promise<CustomerWithDeviceResult> {
        return await this.customerRepository.findWidhDevice(companyKey, documentNumber);
    }

    private async customerAlreadyExist(companyKey: string, documentNumber: string): Promise<boolean> {
        return await this.findByCompanyAndDocument(companyKey, documentNumber) != null;
    }
}