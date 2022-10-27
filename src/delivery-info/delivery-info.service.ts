import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from 'src/location/entities/location.entity';
import { Repository } from 'typeorm';
import {
  CreateDeliveryInfoInput,
  CreateDeliveryInfoOutput,
} from './dtos/create-delivery-info.dto';
import { DeleteDeliveryInfoOutput } from './dtos/delete-delivery-info-dto';
import { ReadAllDeliveryInfoOutput } from './dtos/read-all-delivery-info.dto';
import { ReadOneDeliveryInfoOutput } from './dtos/read-one-delivery-info.dto';
import {
  UpdateDeliveryInfoInput,
  UpdateDeliveryInfoOutput,
} from './dtos/update-delivery-info.dto';
import { DeliveryInfo } from './entities/delivery-info.entity';

@Injectable()
export class DeliveryInfoService {
  constructor(
    @InjectRepository(DeliveryInfo)
    private readonly deliveryinfo: Repository<DeliveryInfo>,
    @InjectRepository(Location)
    private readonly locations: Repository<Location>,
  ) {}

  async createDeliveryInfo(
    createDeliveryInfoInput: CreateDeliveryInfoInput,
  ): Promise<CreateDeliveryInfoOutput> {
    try {
      const location = await this.locations.findOne({
        where: { id: createDeliveryInfoInput.locationId },
      });
      if (!location) {
        return {
          ok: false,
          error: 'Wrong location input.',
        };
      }
      const newDeliveryInfo = this.deliveryinfo.create(createDeliveryInfoInput);
      newDeliveryInfo.location = Promise.resolve(location);
      const deliveryInfo = await this.deliveryinfo.save(newDeliveryInfo);
      return {
        ok: true,
        deliveryInfoId: deliveryInfo.id,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create delivery information.',
      };
    }
  }

  async readOneDeliveryInfo(
    deliveryInfoId: number,
  ): Promise<ReadOneDeliveryInfoOutput> {
    try {
      const deliveryInfo = await this.deliveryinfo.findOne({
        where: { id: deliveryInfoId },
      });
      if (!deliveryInfo) {
        return {
          ok: false,
          error: 'Could not find delivery information from inputed id.',
        };
      }
      return {
        ok: true,
        deliveryInfo,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not read delivery information.',
      };
    }
  }

  async readAllDeliveryInfo(): Promise<ReadAllDeliveryInfoOutput> {
    try {
      const deliveryInformations = await this.deliveryinfo.find();
      if (!deliveryInformations) {
        return {
          ok: false,
          error: 'There is no delivery informations.',
        };
      }
      return {
        ok: true,
        deliveryInfo: deliveryInformations,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not find delivery informations.',
      };
    }
  }

  async updateDeliveryInfo(
    deliveryInfoId: number,
    updateDeliveryInfoInput: UpdateDeliveryInfoInput,
  ): Promise<UpdateDeliveryInfoOutput> {
    try {
      const deliveryInfo = await this.deliveryinfo.findOne({
        where: { id: deliveryInfoId },
      });
      if (!deliveryInfo) {
        return {
          ok: false,
          error: 'Could not find delivery information.',
        };
      }
      await this.deliveryinfo.save({
        id: deliveryInfoId,
        ...updateDeliveryInfoInput,
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not update delivery information.',
      };
    }
  }

  async deleteDeliveryInfo(
    deliveryinfoId: number,
  ): Promise<DeleteDeliveryInfoOutput> {
    try {
      const deliveryInfo = await this.deliveryinfo.findOne({
        where: { id: deliveryinfoId },
      });
      if (!deliveryInfo) {
        return {
          ok: false,
          error: 'Wrong delivery information id inputed.',
        };
      }
      await this.deliveryinfo.delete(deliveryinfoId);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not delete delivery information.',
      };
    }
  }
}
