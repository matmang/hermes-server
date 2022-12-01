import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Store extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  storeImage: string;

  @Column()
  @IsString()
  description: string;

  @Column('simple-array', { nullable: true })
  @IsString()
  menus?: string[];

  @Column('simple-array', { nullable: true })
  @IsString()
  menuImages?: string[];

  @OneToOne(() => User, (user) => user.store, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  owner: User;

  @OneToMany(() => Order, (order) => order.user, {
    lazy: true,
  })
  orders: Promise<Order[]>;
}
