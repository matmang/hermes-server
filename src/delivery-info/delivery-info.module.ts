import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryInfoController } from './delivery-info.controller';
import { DeliveryInfoService } from './delivery-info.service';
import { DeliveryInfo } from './entities/delivery-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryInfo])],
  controllers: [DeliveryInfoController],
  providers: [DeliveryInfoService],
})
export class DeliveryInfoModule {}
