import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Store } from 'src/stores/entities/stores.entity';

export enum UserRole {
  CLIENT = 'CLIENT',
  OWNER = 'OWNER',
}

@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ select: false })
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: 'CLIENT' })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ nullable: true })
  @IsString()
  phoneNumber?: string;

  @OneToOne(() => Store, (store) => store.owner, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  store: Store;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
