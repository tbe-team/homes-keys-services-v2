import { CaslAbilityFactory } from '@/factories';
import { Module } from '@nestjs/common';

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
