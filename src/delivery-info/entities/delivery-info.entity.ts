import { IsBoolean, IsInt, IsPhoneNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

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

  @Column()
  @IsString()
  destination: string;
}
