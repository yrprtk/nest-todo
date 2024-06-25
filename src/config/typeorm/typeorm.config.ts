import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const environment = this.configService.getOrThrow<string>('NODE_ENV');

    switch (environment) {
      case 'production': {
        return this.production();
      }
      case 'development': {
        return this.development();
      }
      case 'test': {
        return this.test();
      }
    }
  }

  public production(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      synchronize: false,
      migrationsRun: true,
      autoLoadEntities: true,
      migrations: ['./dist/db/migrations/*.js'],
      host: this.configService.get<string>('DATABASE_HOST'),
      database: this.configService.get<string>('DATABASE_NAME'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      port: parseInt(this.configService.get<string>('DATABASE_PORT')),
    };
  }

  public development(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      migrationsRun: true,
      autoLoadEntities: true,
      migrations: ['./dist/db/migrations/*.js'],
      host: this.configService.get<string>('DATABASE_HOST'),
      database: this.configService.get<string>('DATABASE_NAME'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      port: parseInt(this.configService.get<string>('DATABASE_PORT')),
    };
  }

  public test(): TypeOrmModuleOptions {
    return {
      dropSchema: true,
      type: 'postgres',
      migrationsRun: true,
      autoLoadEntities: true,
      migrations: ['./dist/db/test-migrations/*.js'],
      host: this.configService.get<string>('DATABASE_HOST'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('TEST_DATABASE_NAME'),
      port: parseInt(this.configService.get<string>('DATABASE_PORT')),
    };
  }
}
