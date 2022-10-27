import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateLocationInput,
  CreateLocationOutput,
} from './dtos/create-location.dto';
import { ReadAllLocationsOutput } from './dtos/read-all-location.dto';
import {
  UpdateLocationInput,
  UpdateLocationOutput,
} from './dtos/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locations: Repository<Location>,
  ) {}

  async createLocation(
    createLocationInput: CreateLocationInput,
  ): Promise<CreateLocationOutput> {
    try {
      const newLocation = this.locations.create(createLocationInput);
      const location = await this.locations.save(newLocation);
      return {
        ok: true,
        locationId: location.id,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create location.',
      };
    }
  }

  async readAllLocations(): Promise<ReadAllLocationsOutput> {
    try {
      const locations = await this.locations.find();
      if (!locations) {
        return {
          ok: false,
          error: 'Could not find locations.',
        };
      }
      return {
        ok: true,
        locations,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create location.',
      };
    }
  }

  async updateLocation(
    locationId: number,
    updateLocationInput: UpdateLocationInput,
  ): Promise<UpdateLocationOutput> {
    try {
      const location = this.locations.findOne({ where: { id: locationId } });
      if (!location) {
        return {
          ok: false,
          error: 'Could not find location.',
        };
      }
      await this.locations.save({
        id: locationId,
        ...updateLocationInput,
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not update location.',
      };
    }
  }

  async deleteLocation(locationId: number) {
    try {
      const location = await this.locations.findOne({
        where: { id: locationId },
      });
      if (!location) {
        return {
          ok: false,
          error: 'Could not find location.',
        };
      }
      await this.locations.delete(locationId);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not delete location.',
      };
    }
  }
}
