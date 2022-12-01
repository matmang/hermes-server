import { PartialType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { Order } from '../entities/order.entity';

export class UpdateOrderInput extends PartialType(Order) {}

export class UpdateOrderOutput extends CoreOutput {}
