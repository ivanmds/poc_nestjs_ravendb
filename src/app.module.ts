import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [CustomerModule, DeviceModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
