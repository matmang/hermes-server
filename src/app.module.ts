import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'Joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryInfoModule } from './delivery-info/delivery-info.module';
import { CommonModule } from './common/common.module';
import { LocationModule } from './location/location.module';
import { SmsModule } from './sms/sms.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'production', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        NCP_ACCESS_KEY: Joi.string().required(),
        NCP_SERVICE_ID: Joi.string().required(),
        NCP_SECRET_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    DeliveryInfoModule,
    CommonModule,
    LocationModule,
    SmsModule.forRoot({
      accesskey: process.env.NCP_ACCESS_KEY,
      secretkey: process.env.NCP_SECRET_KEY,
      service_id: process.env.NCP_SERVICE_ID,
    }),
    EventsModule,
    UsersModule,
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    AuthModule,
    StoresModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
