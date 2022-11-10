import { PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { User } from '../entities/user.entity';

export class LoginInput extends PickType(User, ['email', 'password']) {}

export class LogInOutput extends CoreOutput {
  @IsString()
  token?: string;
}
