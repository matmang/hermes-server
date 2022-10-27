import { PartialType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { CreateDeliveryInfoInput } from './create-delivery-info.dto';

export class UpdateDeliveryInfoInput extends PartialType(
  CreateDeliveryInfoInput,
) {}

export class UpdateDeliveryInfoOutput extends CoreOutput {}
