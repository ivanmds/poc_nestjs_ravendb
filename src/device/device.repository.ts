import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/shared/base.repository";
import { Device } from "./device.interface";

@Injectable()
export class DeviceRepository extends BaseRepository<Device> {
    constructor() {
        super(deviceCollectionName);
    }

    async find(companyKey: string, documentNumber: string) : Promise<Device[]> {
        const session = this.store.openSession();

        const devices = await session.query({ collection: deviceCollectionName })
            .whereEquals("companyKey", companyKey)
            .whereEquals("documentNumber", documentNumber)
            .all();

        return devices as Device[];
    }

    async save(device: Device): Promise<Device> {
        const session = this.store.openSession();
        await session.store(device);
        await session.saveChanges();

        return device;
    }
}

export const deviceCollectionName = "Devices";