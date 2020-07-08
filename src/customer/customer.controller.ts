import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCustomerDto } from "./dto/create-customer.dto";


@Controller("customers")
export class CustomerController {

    constructor(private readonly customerService: CustomerService) { }

    @ApiOperation({summary : 'Return customer'})
    @ApiResponse({ status: 200, description: 'Return customer.'})
    @ApiResponse({ status: 404, description: 'Customer not found.'})
    @Get("/company/:companyKey/document/:documentNumber")
    async find(@Param("companyKey") companyKey, @Param("documentNumber") documentNumber): Promise<Customer> {
        return await this.customerService.find(companyKey, documentNumber);
    }

    @Post()
    async create(@Body() customer: Customer) {
        await this.customerService.save(customer);
    }
}