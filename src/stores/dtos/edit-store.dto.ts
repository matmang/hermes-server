import { PartialType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/dtos/core.dtos';
import { Store } from '../entities/stores.entity';

export class EditStoreInput extends PartialType(Store) {}

export class EditStoreOutput extends CoreOutput {}
