import { Injectable } from "@nestjs/common";
import { Device } from "./device.interface";
import { Result } from "src/shared/result";
import { DeviceModule } from "./device.module";
import { DeviceRepository } from "./device.repository";

@Injectable()
export class DeviceService {

    constructor(private readonly deviceRepository: DeviceRepository) { }

    async find(companyKey: string, documentNumber: string): Promise<Device[]> {
        return await this.deviceRepository.find(companyKey, documentNumber);
    }

    async save(device: Device): Promise<Result<Device>> {

        const result = new Result<Device>();
        await this.deviceRepository.save(device);

        result.data = device;
        return result;
    }
}