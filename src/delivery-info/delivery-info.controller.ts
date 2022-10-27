import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DeliveryInfoService } from './delivery-info.service';
import { CreateDeliveryInfoInput } from './dtos/create-delivery-info.dto';
import { DeleteDeliveryInfoOutput } from './dtos/delete-delivery-info-dto';
import { ReadAllDeliveryInfoOutput } from './dtos/read-all-delivery-info.dto';
import { ReadOneDeliveryInfoOutput } from './dtos/read-one-delivery-info.dto';
import {
  UpdateDeliveryInfoInput,
  UpdateDeliveryInfoOutput,
} from './dtos/update-delivery-info.dto';

@Controller('/api/v1/delivery-info')
export class DeliveryInfoController {
  constructor(private readonly deliveryInfoService: DeliveryInfoService) {}

  @Post('/')
  async createDeliveryInfo(
    @Body() createDeliveryInfoInput: CreateDeliveryInfoInput,
  ): Promise<any> {
    return this.deliveryInfoService.createDeliveryInfo(createDeliveryInfoInput);
  }

  @Get('/:id')
  async readOneDeliveryInfo(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadOneDeliveryInfoOutput> {
    return this.deliveryInfoService.readOneDeliveryInfo(id);
  }

  @Get('/all')
  async readAllDeliveryInfo(): Promise<ReadAllDeliveryInfoOutput> {
    return this.deliveryInfoService.readAllDeliveryInfo();
  }

  @Put('/:id')
  async updateDeliveryInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeliveryInfoInput: UpdateDeliveryInfoInput,
  ): Promise<UpdateDeliveryInfoOutput> {
    return this.deliveryInfoService.updateDeliveryInfo(
      id,
      updateDeliveryInfoInput,
    );
  }

  @Delete('/:id')
  async deleteDeliveryInfo(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteDeliveryInfoOutput> {
    return this.deliveryInfoService.deleteDeliveryInfo(id);
  }
}
