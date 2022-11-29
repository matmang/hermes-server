import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dtos';
import { Store } from '../entities/stores.entity';

export class StoresInput extends PaginationInput {}

export class StoresOutput extends PaginationOutput {
  @ValidateNested()
  @Type(() => Store)
  stores?: Store[];
}
