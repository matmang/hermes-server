import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/stores/entities/stores.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Store, User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrdersModule {}
