import { IsInt, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dtos';

export class CreateLocationInput {
  @IsString()
  roomNumber: string;
}

export class CreateLocationOutput extends CoreOutput {
  @IsInt()
  locationId?: number;
}
