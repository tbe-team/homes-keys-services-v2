import { Floor } from '@/entities';
import { IFloorService } from '@/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FloorService implements IFloorService {
  constructor(
    @InjectRepository(Floor)
    private readonly floorRepository: Repository<Floor>,
  ) {}
}
