import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { Location } from '../entities/location.entity';

export class ReadAllLocationsOutput extends CoreOutput {
  @ValidateNested()
  @Type()
  locations?: Location[];
}
