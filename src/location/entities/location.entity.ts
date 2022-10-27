import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { DeliveryInfo } from 'src/delivery-info/entities/delivery-info.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Location extends CoreEntity {
  @IsString()
  @Column()
  roomNumber: string;

  @OneToMany(() => DeliveryInfo, (deliveryInfo) => deliveryInfo.location, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'deliveryInfoId' })
  orders: Promise<DeliveryInfo[]>;
}
