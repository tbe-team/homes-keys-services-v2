import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class GetDataStartToEndOptionRequest {
  @ApiProperty()
  // @ApiPropertyOptional()
  // @IsOptional()
  readonly startDate: string;

  // @ApiPropertyOptional({
  //   minimum: 1,
  //   default: 1,
  // })
  // @Type(() => Number)
  // @IsInt()
  // @Min(1)
  // @IsOptional()
  @ApiProperty()
  readonly endDate: string;

  // @ApiPropertyOptional({
  //   minimum: 1,
  //   maximum: 50,
  //   default: 10,
  // })
  // @Type(() => Number)
  // @IsInt()
  // @Min(1)
  // @Max(50)
  // @IsOptional()
  @ApiProperty()
  readonly intervalType: string;
}
