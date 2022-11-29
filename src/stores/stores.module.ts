import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Store } from './entities/stores.entity';
import { StoreController } from './stores.controller';
import { StoreService } from './stores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, User])],
  providers: [StoreService],
  exports: [StoreService],
  controllers: [StoreController],
})
export class StoresModule {}
