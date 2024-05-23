import { MotelRoom } from '@/entities';
import { Action } from '@/enums';
import { AppAbility } from '@/factories';
import { IPolicyHandler } from '@/types';

export class UpdateMotelPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, MotelRoom);
  }
}
