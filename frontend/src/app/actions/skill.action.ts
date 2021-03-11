import { Skill } from '../models/skill.model';

export class SearchSkills {
  static readonly type = '[Skill] Search';

  constructor(public query: string) {}
}
