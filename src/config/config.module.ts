import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { validate } from './env.validation';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`.trim(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      validationSchema: Joi.object({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        NODE_ENV: Joi.string()
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .valid('development', 'production', 'test')
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .default('development'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        PORT: Joi.number().port().default(3000),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        MONGO_URI: Joi.string()
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .uri()
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .required()
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .description('MongoDB connection string'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        JWT_SECRET: Joi.string().required(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        JWT_EXPIRES_IN: Joi.string().required(),
      }),
      validate,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class CustomConfigModule {}
