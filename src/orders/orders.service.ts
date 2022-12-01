import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsGateway } from 'src/events/events.gateway';
import { Store } from 'src/stores/entities/stores.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import {
  ReadMyOrdersInput,
  ReadMyOrdersOutput,
} from './dtos/read-my-orders.dto';
import {
  ReadOneOrderInput,
  ReadOneOrderOutput,
} from './dtos/read-one-order.dto';
import { UpdateOrderInput, UpdateOrderOutput } from './dtos/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,
    @InjectRepository(Store)
    private readonly stores: Repository<Store>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async createOrder(
    customer: User,
    createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    try {
      const store = await this.stores.findOne({
        where: { id: createOrderInput.storeId },
      });
      if (!store) {
        return {
          ok: false,
          error: 'Store not found',
        };
      }
      const neworder: Order = this.orders.create({
        menus: createOrderInput.menus,
      });
      neworder.user = Promise.resolve(customer);
      neworder.store = Promise.resolve(store);
      const order = await this.orders.save(neworder);
      this.eventsGateway.initDelivery('message', 'robot', store.name);
      return {
        ok: true,
        orderId: order.id,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create order.',
      };
    }
  }

  async readMyOrders(authUser: User): Promise<ReadMyOrdersOutput> {
    try {
      const orders = await authUser.orders;
      return {
        ok: true,
        orders,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not read orders',
      };
    }
  }

  async readOneOrder(orderId: number): Promise<ReadOneOrderOutput> {
    try {
      const order = await this.orders.findOne({ where: { id: orderId } });
      if (!order) {
        return {
          ok: false,
          error: 'Could not find order',
        };
      }
      return {
        ok: true,
        order,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not read order',
      };
    }
  }

  async updateOrder(
    orderId: number,
    updateOrderInput: UpdateOrderInput,
  ): Promise<UpdateOrderOutput> {
    try {
      const order: Order = await this.orders.findOne({
        where: { id: orderId },
      });
      if (!order) {
        return {
          ok: false,
          error: 'Could not find order',
        };
      }
      await this.orders.save({
        id: orderId,
        ...updateOrderInput,
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not update order',
      };
    }
  }

  async deleteOrder(orderId: number) {
    try {
      const order = await this.orders.findOne({ where: { id: orderId } });
      if (!order) {
        return {
          ok: false,
          error: 'Could not find order',
        };
      }
      await this.orders.delete(order.id);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: true,
        error: 'Could not delete order',
      };
    }
  }
}
