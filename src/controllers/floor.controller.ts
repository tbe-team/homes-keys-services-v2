import { FloorService } from '@/services';
import { Controller } from '@nestjs/common';

@Controller('/floors')
export class FloorController {
  constructor(private floorService: FloorService) {}
}
