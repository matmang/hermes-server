import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateLocationInput,
  CreateLocationOutput,
} from './dtos/create-location.dto';
import { LocationService } from './location.service';

@Controller('/api/v1/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('/')
  async createLocation(
    @Body() createLocationInput: CreateLocationInput,
  ): Promise<CreateLocationOutput> {
    return this.locationService.createLocation(createLocationInput);
  }
}
