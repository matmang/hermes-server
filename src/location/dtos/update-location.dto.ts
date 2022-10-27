import { PartialType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { CreateLocationInput } from './create-location.dto';

export class UpdateLocationInput extends PartialType(CreateLocationInput) {}

export class UpdateLocationOutput extends CoreOutput {}
