import { IsBoolean, IsInt, IsPhoneNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dtos';

export class CreateDeliveryInfoInput {
  @IsPhoneNumber()
  senderPhoneNumber: string;

  @IsPhoneNumber()
  receiverPhoneNumber: string;

  @IsInt()
  password?: number;

  @IsBoolean()
  isRegistered: boolean;

  @IsInt()
  locationId: number;
}

export class CreateDeliveryInfoOutput extends CoreOutput {
  @IsInt()
  deliveryInfoId?: number;
}
