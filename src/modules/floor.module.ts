import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FloorController } from '@/controllers';
import { Floor } from '@/entities';
import { FloorService } from '@/services';
import { FloorProfile } from '@/profiles';

@Module({
  imports: [TypeOrmModule.forFeature([Floor])],
  providers: [FloorService, FloorProfile],
  controllers: [FloorController],
  exports: [FloorService],
})
export class FloorModule {}
