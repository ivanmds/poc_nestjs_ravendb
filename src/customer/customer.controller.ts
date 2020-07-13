import { Controller, Get, Param, Post, Body, NotFoundException, BadRequestException, Put } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Customer } from "./customer.entities";
import { CustomerWithDeviceResult } from "src/config/Indexs/customer_with_device.index";

@Controller("customers")
export class CustomerController {

    constructor(private readonly customerService: CustomerService) { }

    @ApiOperation({summary : 'Return customers'})
    @ApiResponse({ status: 200, description: 'Return customers.'})
    @ApiResponse({ status: 404, description: 'Customers not found.'})
    @Get("company/:companyKey")
    async getByCompanyKey(@Param('companyKey') companyKey): Promise<Customer[]> {
        const customers: Customer[] = await this.customerService.findByCompany(companyKey);
        
        if(customers?.length > 0) return customers;
        throw new NotFoundException("Customers not found");
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

    @ApiOperation({summary : 'Return customer with device'})
    @ApiResponse({ status: 200, description: 'Return customer.'})
    @ApiResponse({ status: 404, description: 'Customer not found.'})
    @Get("/company/:companyKey/document/:documentNumber/withDevice")
    async findWithDevice(@Param("companyKey") companyKey, @Param("documentNumber") documentNumber): Promise<CustomerWithDeviceResult> {
        const result: CustomerWithDeviceResult = await this.customerService.findWidhDevice(companyKey, documentNumber);
        if(!result) throw new NotFoundException("Not found");

        return result;
    }

    @Post()
    async create(@Body() customer: Customer) {
       var result = await this.customerService.create(customer);
       if(result.isSuccess) {
           return result.data;
       } else {
           throw new BadRequestException(result.errors);
       }
    }

    @Put("/company/:companyKey/document/:documentNumber")
    async update(@Param("companyKey") companyKey, @Param("documentNumber") documentNumber, @Body() customer: Customer) {
        customer.companyKey = companyKey;
        customer.documentNumber = documentNumber;

        var result = await this.customerService.update(customer);
        if(result.isSuccess) {
            return result.data;
        } else {
            throw new BadRequestException(result.errors);
        }
    }
    
}