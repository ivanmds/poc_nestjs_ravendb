import { Controller, Get, Param, Post, Body, NotFoundException, BadRequestException } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller("customers")
export class CustomerController {

    constructor(private readonly customerService: CustomerService) { }

    @ApiOperation({summary : 'Return customers'})
    @ApiResponse({ status: 200, description: 'Return customers.'})
    @ApiResponse({ status: 404, description: 'Customers not found.'})
    @Get("company/:companyKey")
    async getByCompanyKey(@Param('companyKey') companyKey): Promise<Customer[]> {
        const customers: Customer[] = await this.customerService.findByCompany(companyKey);
        if(!customers) throw new NotFoundException("Customers not found");

        return customers;
    }

    @ApiOperation({summary : 'Return customer'})
    @ApiResponse({ status: 200, description: 'Return customer.'})
    @ApiResponse({ status: 404, description: 'Customer not found.'})
    @Get("/company/:companyKey/document/:documentNumber")
    async find(@Param("companyKey") companyKey, @Param("documentNumber") documentNumber): Promise<Customer> {
        const customer: Customer = await this.customerService.findByCompanyAndDocument(companyKey, documentNumber);
        if(!customer) throw new NotFoundException("Customer not found");

        return customer;
    }

    @Post()
    async create(@Body() customer: Customer) {
       var result = await this.customerService.save(customer);
       if(result.isSuccess) {
           return result.data;
       } else {
           throw new BadRequestException(result.errors);
       }
    }
    
}