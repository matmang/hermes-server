import { Body, Controller, Post } from '@nestjs/common';
import { DeliveryInfoService } from './delivery-info.service';
import { CreateDeliveryInfoInput } from './dtos/create-delivery-info.dto';

@Controller('/api/v1/delivery-info')
export class DeliveryInfoController {
  constructor(private readonly deliveryInfoService: DeliveryInfoService) {}

  @Post('/')
  async createDeliveryInfo(
    @Body() createDeliveryInfoInput: CreateDeliveryInfoInput,
  ): Promise<any> {
    return this.deliveryInfoService.createDeliveryInfo(createDeliveryInfoInput);
  }
}
