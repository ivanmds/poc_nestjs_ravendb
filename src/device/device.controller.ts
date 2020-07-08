import { Controller, Post, Body, BadRequestException, Get, Param, NotFoundException } from "@nestjs/common";
import { Device } from "./device.interface";
import { DeviceService } from "./device.service";

@Controller("devices")
export class DeviceController {

    constructor(private readonly deviceService: DeviceService) { }

    @Get("/company/:companyKey/document/:documentNumber")
    async Get(@Param("companyKey") companyKey: string, @Param("documentNumber") documentNumber: string) {
        var devices = await this.deviceService.find(companyKey, documentNumber);

        if(devices?.length > 0) return devices;
        throw new NotFoundException("Devices not found");
    }

    @Post()
    async Post(@Body() device: Device) {
        const result = await this.deviceService.save(device);
        if(result.isSuccess) {
            return result.data;
        } else {
            throw new BadRequestException(result.errors);
        }
    }

}