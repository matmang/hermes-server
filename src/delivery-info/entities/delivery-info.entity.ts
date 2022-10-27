import { IsBoolean, IsInt, IsPhoneNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Location } from 'src/location/entities/location.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class DeliveryInfo extends CoreEntity {
  @Column()
  @IsPhoneNumber()
  senderPhoneNumber: string;

  @Column()
  @IsPhoneNumber()
  receiverPhoneNumber: string;

  @Column()
  @IsInt()
  password?: number;

  @Column({ default: false })
  @IsBoolean()
  isRegistered: boolean;

  @ManyToOne(() => Location, (location) => location.orders)
  @JoinColumn({ name: 'locationId' })
  location: Promise<Location>;
}
