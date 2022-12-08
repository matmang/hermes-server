import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { Store } from '../entities/stores.entity';

export class ReadOneStoreInput {}

export class ReadOneStoreOutput extends CoreOutput {
  @ValidateNested()
  @Type(() => Store)
  store?: Store;
}
