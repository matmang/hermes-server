import { PickType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { Store } from '../entities/stores.entity';

export class CreateStoreInput extends PickType(Store, [
  'name',
  'description',
  'storeImage',
]) {}

export class CreateStoreOutput extends CoreOutput {
  @IsInt()
  storeId?: number;
}
