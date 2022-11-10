import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { User } from '../entities/user.entity';

export class UserProfileInput {
  @IsNumber()
  userId: number;
}

export class UserProfileOutput extends CoreOutput {
  @ValidateNested()
  @Type(() => User)
  user?: User;
}
