import { MotelRoom, User } from '@/entities';
import { Action, Role } from '@/enums';
import {
  InferSubjects,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';

type Subjects = InferSubjects<any> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[Action, Subjects]>
    >(PureAbility as unknown as AbilityClass<AppAbility>);

    switch (user.role.roleName) {
      case Role.Admin:
        can(Action.Manage, 'all'); // read-write access to everything
        break;
      case Role.Host:
        can(Action.Create, 'all');
        can(Action.Update, 'all');
        cannot(Action.Delete, 'all');
        break;
      case Role.User:
        can(Action.Create, 'all');
        cannot(Action.Update, 'all');
        cannot(Action.Delete, 'all');
        break;
      default:
        cannot(Action.Manage, 'all'); // can not access to everything
        break;
    }

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
