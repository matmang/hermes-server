import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateDeliveryInfoInput,
  CreateDeliveryInfoOutput,
} from './dtos/create-delivery-info.dto';
import { DeliveryInfo } from './entities/delivery-info.entity';

@Injectable()
export class DeliveryInfoService {
  constructor(
    @InjectRepository(DeliveryInfo)
    private readonly deliveryinfo: Repository<DeliveryInfo>,
  ) {}

  async createDeliveryInfo(
    createDeliveryInfoInput: CreateDeliveryInfoInput,
  ): Promise<CreateDeliveryInfoOutput> {
    try {
      const newDeliveryInfo = this.deliveryinfo.create(createDeliveryInfoInput);
      const deliveryInfo = await this.deliveryinfo.save(newDeliveryInfo);
      return {
        ok: true,
        deliveryInfoId: deliveryInfo.id,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create delivery information.',
      };
    }
  }
}
