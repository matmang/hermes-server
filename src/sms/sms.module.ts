import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { SmsModuleOptions } from './sms.interface';
import { SmsService } from './sms.service';

@Module({})
@Global()
export class SmsModule {
  static forRoot(options: SmsModuleOptions): DynamicModule {
    return {
      module: SmsModule,
      exports: [SmsService],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        SmsService,
      ],
    };
  }
}
