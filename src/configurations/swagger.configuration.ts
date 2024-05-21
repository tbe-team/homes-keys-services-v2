import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfiguration = new DocumentBuilder()
  .setTitle('Home Key Service V2.0.0')
  .setDescription('Home Key Service API')
  .setVersion('v2.0.0')
  .addServer('/api/v1.0.0')
  .addBearerAuth()
  .addSecurityRequirements('bearer')
  .build();
