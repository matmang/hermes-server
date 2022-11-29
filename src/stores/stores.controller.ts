import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateStoreInput, CreateStoreOutput } from './dtos/create-store.dto';
import { DeleteStoreOutput } from './dtos/delete-store.dto';
import { EditStoreInput, EditStoreOutput } from './dtos/edit-store.dto';
import { StoresInput, StoresOutput } from './dtos/stores.dto';
import { StoreService } from './stores.service';

@Controller('api/v1/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Role(['OWNER'])
  @Post('/')
  async createStore(
    @AuthUser() owner: User,
    @Body() createStoreInput: CreateStoreInput,
  ): Promise<CreateStoreOutput> {
    return this.storeService.createStore(owner, createStoreInput);
  }

  @Get('/all')
  async allStores(@Query() storesInput: StoresInput): Promise<StoresOutput> {
    return this.storeService.allStores(storesInput);
  }

  @Role(['OWNER'])
  @Patch('/')
  async editStore(
    @Body() editStoreInput: EditStoreInput,
  ): Promise<EditStoreOutput> {
    return this.storeService.editStore(editStoreInput);
  }

  @Role(['OWNER'])
  @Delete('/:storeId')
  async DeleteStoreOutput(
    @Param('storeId', new ParseIntPipe()) storeId: number,
  ): Promise<DeleteStoreOutput> {
    return this.storeService.deleteStore(storeId);
  }
}
