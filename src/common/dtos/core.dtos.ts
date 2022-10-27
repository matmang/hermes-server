import { IsString, IsBoolean } from 'class-validator';
export class CoreOutput {
  @IsString()
  error?: string;
  @IsBoolean()
  ok: boolean;
}
