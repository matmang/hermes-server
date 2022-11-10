import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LogInOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-account')
  async createAccount(
    @Body() createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  @Post('/login')
  async login(@Body() loginInput: LoginInput): Promise<LogInOutput> {
    return this.userService.login(loginInput);
  }

  @Get('/me')
  @Role(['CLIENT'])
  me(@AuthUser() authUser: User) {
    return authUser;
  }
}
