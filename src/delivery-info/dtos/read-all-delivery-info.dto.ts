import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { DeliveryInfo } from '../entities/delivery-info.entity';

export class ReadAllDeliveryInfoOutput extends CoreOutput {
  @ValidateNested()
  @Type(() => DeliveryInfo)
  deliveryInfo?: DeliveryInfo[];
}
