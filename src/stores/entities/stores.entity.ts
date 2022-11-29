import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

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
}
