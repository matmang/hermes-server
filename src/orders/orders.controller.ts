import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { DeleteOrderOutput } from './dtos/delete-order.dto';
import { ReadMyOrdersOutput } from './dtos/read-my-orders.dto';
import { ReadOneOrderOutput } from './dtos/read-one-order.dto';
import { UpdateOrderInput, UpdateOrderOutput } from './dtos/update-order.dto';
import { OrderService } from './orders.service';

@Controller('/api/v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Role(['ANY'])
  @Post('/')
  async createOrder(
    @Body() createOrderInput: CreateOrderInput,
    @AuthUser() customer: User,
  ): Promise<CreateOrderOutput> {
    return this.orderService.createOrder(customer, createOrderInput);
  }

  @Role(['ANY'])
  @Get('/my')
  async readMyOrders(@AuthUser() authUser: User): Promise<ReadMyOrdersOutput> {
    return this.orderService.readMyOrders(authUser);
  }

  @Role(['ANY'])
  @Get('/:orderId')
  async readOneOrder(
    @Param('orderId', new ParseIntPipe()) orderId: number,
  ): Promise<ReadOneOrderOutput> {
    console.log(orderId);
    return this.orderService.readOneOrder(orderId);
  }

  @Role(['ANY'])
  @Patch('/:orderId')
  async updateOrder(
    @Param('orderId', new ParseIntPipe()) orderId: number,
    @Body() updateOrderInput: UpdateOrderInput,
  ): Promise<UpdateOrderOutput> {
    return this.orderService.updateOrder(orderId, updateOrderInput);
  }

  @Role(['ANY'])
  @Delete('/:orderId')
  async deleteOrder(
    @Param('orderId', new ParseIntPipe()) orderId: number,
  ): Promise<DeleteOrderOutput> {
    return this.orderService.deleteOrder(orderId);
  }
}
