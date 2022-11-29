import { IsInt } from 'class-validator';
import { CoreOutput } from './core.dtos';

export class PaginationInput {
  @IsInt()
  page = 1;
}

export class PaginationOutput extends CoreOutput {
  @IsInt()
  totalpages?: number;

  @IsInt()
  totalItems?: number;
}
