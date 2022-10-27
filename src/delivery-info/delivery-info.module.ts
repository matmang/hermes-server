import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from 'src/location/entities/location.entity';
import { DeliveryInfoController } from './delivery-info.controller';
import { DeliveryInfoService } from './delivery-info.service';
import { DeliveryInfo } from './entities/delivery-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryInfo, Location])],
  controllers: [DeliveryInfoController],
  providers: [DeliveryInfoService],
})
export class DeliveryInfoModule {}
