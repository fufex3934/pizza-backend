import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { validate } from './env.validation';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`.trim(),

      validationSchema: Joi.object({
        NODE_ENV: Joi.string()

          .valid('development', 'production', 'test')

          .default('development'),

        PORT: Joi.number().port().default(3000),

        MONGO_URI: Joi.string()

          .uri()

          .required()

          .description('MongoDB connection string'),

        JWT_SECRET: Joi.string().required(),

        JWT_EXPIRES_IN: Joi.string().required(),
      }),
      validate,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class CustomConfigModule {}
