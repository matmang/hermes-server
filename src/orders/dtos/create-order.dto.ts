import { PickType } from '@nestjs/mapped-types';
import { IsInt, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { Order } from '../entities/order.entity';

export class CreateOrderInput extends PickType(Order, ['menus']) {
  @IsInt()
  storeId: number;
}

export class CreateOrderOutput extends CoreOutput {
  @IsInt()
  orderId?: number;
}
