import { NestModule, MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CustomerRepository } from "./customer.repository";
import { CustomerCache } from "./customer.cache";


@Module({
    controllers: [CustomerController],
    providers: [CustomerService, CustomerRepository, CustomerCache],
})
export class CustomerModule implements NestModule {
    configure(consumer: MiddlewareConsumer) { }
}