import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { Device, Floor, MotelRoom, Room, User, Role } from '@/entities';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // entities: [Room, Device, Floor, MotelRoom, User, Role],
        // Get all entities from @/src/entities
        entities: [
          join(__dirname, '..', 'entities', '**', '*.entity{.ts,.js}'),
        ],
        synchronize: configService.get<string>('ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
