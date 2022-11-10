import { PickType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { User } from '../entities/user.entity';

export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
  'phoneNumber',
]) {}

export class CreateAccountOutput extends CoreOutput {}
