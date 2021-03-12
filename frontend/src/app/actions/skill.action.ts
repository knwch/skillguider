import { Skill } from '../models/skill.model';

export class SearchSkills {
  static readonly type = '[Skill] Search';

  constructor(public query: string) {}
}

export class GetSkillsByJob {
  static readonly type = '[Skill] Get by Job';

  constructor(public id: string) {}
}