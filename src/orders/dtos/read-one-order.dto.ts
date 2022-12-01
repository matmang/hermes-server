import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { Order } from '../entities/order.entity';

export class ReadOneOrderInput {}

export class ReadOneOrderOutput extends CoreOutput {
  @ValidateNested()
  @Type(() => Order)
  order?: Order;
}
