import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "./customer.repository";
import { Result } from "src/shared/result";

@Injectable()
export class CustomerService {

    constructor(private readonly customerRepository: CustomerRepository) { }

    async findByCompany(companyKey: string): Promise<Customer[]> {
        return await this.customerRepository.findByCompany(companyKey);
    }

    async findByCompanyAndDocument(companyKey: string, documentNumber: string): Promise<Customer> {
        return await this.customerRepository.findByCompanyAndDocument(companyKey, documentNumber);
    }

    async save(customer: Customer): Promise<Result<Customer>> {
        const result = new Result<Customer>();

        const alreadyExist = await this.customerAlreadyExist(customer.companyKey, customer.documentNumber);
        if(alreadyExist) {
            result.isSuccess = false;
            result.errors = ["Customer already exist"];
        } else {
            await this.customerRepository.save(customer);
            result.data = customer;
        }
        
        return result;
    }

    private async customerAlreadyExist(companyKey: string, documentNumber: string) : Promise<boolean> {
        return await this.findByCompanyAndDocument(companyKey, documentNumber) != null;
    }
}