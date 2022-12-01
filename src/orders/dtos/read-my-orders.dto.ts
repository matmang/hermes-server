import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { Order } from '../entities/order.entity';

export class ReadMyOrdersInput {}

export class ReadMyOrdersOutput extends CoreOutput {
  @ValidateNested()
  @Type(() => Order)
  orders?: Order[];
}
