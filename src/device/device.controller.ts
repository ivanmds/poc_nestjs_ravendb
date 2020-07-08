import { Controller, Post, Body } from "@nestjs/common";
import { Device } from "./device.interface";
import { DeviceService } from "./device.service";

@Controller("devices")
export class DeviceController {

    constructor(private readonly deviceService: DeviceService) { }

    @Post()
    async Post(@Body() device: Device) {
        await this.deviceService.save(device);
    }

}