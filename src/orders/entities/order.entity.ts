import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Store } from 'src/stores/entities/stores.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Order extends CoreEntity {
  @Column('simple-array')
  @IsString({ each: true })
  menus: string[];

  @ManyToOne(() => Store, (store) => store.orders, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'storeId' })
  store: Promise<Store>;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;
}
